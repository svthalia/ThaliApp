import { all, fork } from 'redux-saga/effects';

import loginSaga from './login';
import eventSaga from './event';

const sagas = function* sagas() {
  yield all([
    fork(loginSaga),
    fork(eventSaga),
  ]);
};

export default sagas;
