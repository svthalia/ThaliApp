import ImagePicker from 'react-native-image-picker';
import {
  call, put, select, takeEvery, cps
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';
import i18next from '../utils/i18n';

import { apiRequest } from '../utils/url';
import * as profileActions from '../actions/profile';
import { tokenSelector } from '../selectors/session';

const t = i18next.getFixedT(undefined, 'sagas/profile');

const openImageLibrary = options => new Promise((resolve, reject) => {
  ImagePicker.launchImageLibrary(options, (response) => {
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
    Sentry.captureException(error);
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
    const response = yield call(openImageLibrary, options);
    const source = response.uri;
    console.log(source);
  } catch (e) {
    // eat error, om nom nom
    // error from the picker that we cannot do anything about
  }

  // const { member } = action.payload;
  // const token = yield select(tokenSelector);
  // yield put(profileActions.updating());
  //
  // const data = {
  //   method: 'PUT',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     Authorization: `Token ${token}`,
  //   },
  // };
  //
  // try {
  //   const profileData = yield call(apiRequest, `members/${member}`, data);
  //   yield put(profileActions.updateSuccess(profileData));
  // } catch (error) {
  //   Sentry.captureException(error);
  //   yield put(profileActions.updateFail());
  // }
}

function* profileSaga() {
  yield takeEvery(profileActions.PROFILE, profile);
  yield takeEvery(profileActions.CHANGE_AVATAR, updateAvatar);
}

export default profileSaga;
