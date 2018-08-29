import { call, put, takeEvery } from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';

import { apiRequest } from '../utils/url';
import * as profileActions from '../actions/profile';
import * as navActions from '../actions/navigation';
import { PROFILE_SCENE } from '../ui/components/navigator/scenes';

const profile = function* profile(action) {
  const { token, member } = action.payload;

  yield put(profileActions.fetching());
  yield put(navActions.navigate(PROFILE_SCENE));

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
