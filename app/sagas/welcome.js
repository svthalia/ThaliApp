import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import { apiRequest } from '../utils/url';
import * as welcomeActions from '../actions/welcome';
import * as sessionActions from '../actions/session';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

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
      yield put(sessionActions.tokenInvalid());
    }
    yield call(reportError, error);
    yield put(welcomeActions.failure());
  }
};

export default function* () {
  yield takeEvery([sessionActions.SIGNED_IN, welcomeActions.REFRESH], welcome);
}
