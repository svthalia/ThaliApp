import ImagePicker from 'react-native-image-picker';
import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Alert, Platform } from 'react-native';
import Snackbar from 'react-native-snackbar';
import i18next from '../utils/i18n';

import { apiRequest } from '../utils/url';
import * as profileActions from '../actions/profile';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

const t = i18next.getFixedT(undefined, 'sagas/profile');

const openImageLibrary = options => new Promise((resolve, reject) => {
  ImagePicker.showImagePicker(options, (response) => {
    if (response.error || response.didCancel) {
      reject(response);
    }
    resolve(response);
  });
});

function* profile(action) {
  const { member } = action.payload;
  const token = yield select(tokenSelector);

  yield put(profileActions.fetching());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const profileData = yield call(apiRequest, `members/${member}`, data);
    yield put(profileActions.success(profileData));
  } catch (error) {
    yield call(reportError, error);
    yield put(profileActions.failure());
  }
}

function* updateAvatar() {
  const options = {
    title: t('Change profile picture'),
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  try {
    const photo = yield call(openImageLibrary, options);

    const formData = new FormData();

    formData.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });

    const token = yield select(tokenSelector);

    const data = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: formData,
    };

    try {
      yield call([Snackbar, 'show'], { title: t('Uploading your new profile picture...'), duration: Snackbar.LENGTH_INDEFINITE });
      const profileData = yield call(apiRequest, 'members/me', data);
      yield call([Snackbar, 'dismiss']);
      yield put(profileActions.success(profileData));
    } catch (error) {
      yield call([Snackbar, 'dismiss']);
      yield call(reportError, error);
      if ('photo' in error.response.jsonData) {
        yield call(Alert.alert, t('Could not update profile picture'), error.response.jsonData.photo.join(' '));
      } else {
        yield call([Snackbar, 'show'], { title: t('Could not update profile picture') });
      }
    }
  } catch (e) {
    // eat error, om nom nom
    // error from the picker that we cannot do anything about
  }
}

export default function* () {
  yield takeEvery(profileActions.PROFILE, profile);
  yield takeEvery(profileActions.CHANGE_AVATAR, updateAvatar);
}
