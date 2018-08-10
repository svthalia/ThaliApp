import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as welcomeActions from '../actions/welcome';
import * as loginActions from '../actions/session';

const welcome = function* welcome() {
  const token = yield select(tokenSelector);
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  const params = {
    limit: 5,
    ordering: 'start',
  };

  try {
    const response = yield call(apiRequest, 'events', data, params);
    yield put(welcomeActions.success(response.results));
  } catch (error) {
    if (error.name === 'TokenInvalidError') {
      yield put(loginActions.tokenInvalid());
    }
    Sentry.captureException(error);
    yield put(welcomeActions.failure());
  }
};

const welcomeSaga = function* eventSaga() {
  yield takeEvery([loginActions.SUCCESS, welcomeActions.REFRESH], welcome);
};

export default welcomeSaga;
