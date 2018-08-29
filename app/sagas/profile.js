import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as profileActions from '../actions/profile';

const profile = function* profile(action) {
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
};

const profileSaga = function* eventSaga() {
  yield takeEvery(profileActions.PROFILE, profile);
};

export default profileSaga;
