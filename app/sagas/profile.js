import ImagePicker from 'react-native-image-crop-picker';
import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import i18next from '../utils/i18n';

import { apiRequest } from '../utils/url';
import * as profileActions from '../actions/profile';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';
import * as sessionActions from '../actions/session';

const t = i18next.getFixedT(undefined, 'sagas/profile');

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
    width: 500,
    height: 500,
    cropping: true,
    mediaType: 'photo',
  };

  try {
    const photo = yield call([ImagePicker, 'openPicker'], options);
    const fileName = photo.path.split('/').pop();

    const formData = new FormData();

    formData.append('photo', {
      name: fileName,
      type: photo.mime,
      uri: photo.path,
    });

    const token = yield select(tokenSelector);

    const data = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Token ${token}`,
      },
      body: formData,
    };

    try {
      yield call([Snackbar, 'show'], { title: t('Uploading your new profile picture...'), duration: Snackbar.LENGTH_INDEFINITE });
      const profileData = yield call(apiRequest, 'members/me', data);
      yield call([Snackbar, 'dismiss']);
      yield put(profileActions.success(profileData));
      yield put(sessionActions.fetchUserInfo());
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
