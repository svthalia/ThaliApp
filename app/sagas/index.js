import { all, fork } from 'redux-saga/effects';

import loginSaga from './login';
import eventSaga from './event';
import profileSaga from './profile';
import welcomeSaga from './welcome';
import calendarSaga from './calendar';
import pushNotificationsSaga from './pushNotifications';
import pizzaSaga from './pizza';
import registrationSaga from './registration';
import deepLinkingSaga from './deepLinking';

const sagas = function* sagas() {
  yield all([
    fork(loginSaga),
    fork(eventSaga),
    fork(profileSaga),
    fork(welcomeSaga),
    fork(calendarSaga),
    fork(pushNotificationsSaga),
    fork(pizzaSaga),
    fork(registrationSaga),
    fork(deepLinkingSaga),
  ]);
};

export default sagas;
