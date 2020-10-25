import ImagePicker from 'react-native-image-crop-picker';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';

import * as profileActions from '../actions/profile';
import reportError from '../utils/errorReporting';
import * as sessionActions from '../actions/session';
import { getRequest, patchRequest } from './utils/api';

function* profile(action) {
  const { member } = action.payload;

  yield put(profileActions.fetching());

  try {
    const profileData = yield call(getRequest, `members/${member}`);
    yield put(profileActions.success(profileData));
  } catch (error) {
    yield call(reportError, error);
    yield put(profileActions.failure());
  }
}

function* updateAvatar() {
  const options = {
    title: 'Change profile picture',
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

    try {
      yield call([Snackbar, 'show'], { text: 'Uploading your new profile picture...', duration: Snackbar.LENGTH_INDEFINITE });
      const profileData = yield call(patchRequest, 'members/me', formData);
      yield call([Snackbar, 'dismiss']);
      yield put(profileActions.success(profileData));
      yield put(sessionActions.fetchUserInfo());
    } catch (error) {
      yield call([Snackbar, 'dismiss']);
      yield call(reportError, error);
      if ('photo' in error.response.jsonData) {
        yield call(
          Alert.alert,
          'Could not update profile picture',
          error.response.jsonData.photo.join(' ')
        );
      } else {
        yield call([Snackbar, 'show'], {
          text: 'Could not update profile picture',
        });
      }
    }
  } catch (e) {
    // eat error, om nom nom
    // error from the picker that we cannot do anything about
  }
}

export default function* profileSaga() {
  yield takeEvery(profileActions.PROFILE, profile);
  yield takeEvery(profileActions.CHANGE_AVATAR, updateAvatar);
}
