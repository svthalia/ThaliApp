import { all, fork } from 'redux-saga/effects';

import loginSaga from './login';
import eventSaga from './event';
import profileSaga from './profile';
import welcomeSaga from './welcome';
import calendarSaga from './calendar';

const sagas = function* sagas() {
  yield all([
    fork(loginSaga),
    fork(eventSaga),
    fork(profileSaga),
    fork(welcomeSaga),
    fork(calendarSaga),
  ]);
};

export default sagas;
