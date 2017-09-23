import { all, fork } from 'redux-saga/effects';

import loginSaga from './login';

const sagas = function* sagas() {
  yield all([
    fork(loginSaga),
  ]);
};

export default sagas;
