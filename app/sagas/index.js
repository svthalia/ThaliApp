import { all, fork } from 'redux-saga/effects';

import loginSaga from './login';
import eventSaga from './event';
import profileSaga from './profile';

const sagas = function* sagas() {
  yield all([
    fork(loginSaga),
    fork(eventSaga),
    fork(profileSaga),
  ]);
};

export default sagas;
