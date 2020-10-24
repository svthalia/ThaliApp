import { call, put, takeEvery } from 'redux-saga/effects';

import * as welcomeActions from '../actions/welcome';
import * as sessionActions from '../actions/session';
import reportError from '../utils/errorReporting';
import { getRequest } from './utils/api';

const welcome = function* welcome() {
  const params = {
    limit: 5,
    ordering: 'start',
  };

  try {
    const response = yield call(getRequest, 'events', params);
    yield put(welcomeActions.success(response.results));
  } catch (error) {
    yield call(reportError, error);
    yield put(welcomeActions.failure());
  }
};

export default function* welcomeSaga() {
  yield takeEvery([sessionActions.SIGNED_IN, welcomeActions.REFRESH], welcome);
}
