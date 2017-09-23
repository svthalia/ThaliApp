import { call, put, takeEvery } from 'redux-saga/effects';

import { apiRequest } from '../url';
import * as welcomeActions from '../actions/welcome';

const welcome = function* welcome(action) {
  const { token, amount } = action.payload;

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  const params = {
    limit: amount,
    ordering: 'start',
  };

  try {
    const response = yield call(apiRequest, 'events', data, params);
    yield put(welcomeActions.success(response));
  } catch (error) {
    yield put(welcomeActions.failure());
  }
};

const welcomeSaga = function* eventSaga() {
  yield takeEvery(welcomeActions.WELCOME, welcome);
};

export default welcomeSaga;
