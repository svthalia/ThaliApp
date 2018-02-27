import { all, fork } from 'redux-saga/effects';

import sessionSaga from './session';
import navigationSaga from './navigation';
import eventSaga from './event';
import profileSaga from './profile';
import welcomeSaga from './welcome';
import calendarSaga from './calendar';
import pushNotificationsSaga from './pushNotifications';
import pizzaSaga from './pizza';
import registrationSaga from './registration';
import deepLinkingSaga from './deepLinking';
import membersSaga from './members';
import settingsSaga from './settings';
import photosSaga from './photos';

export default function* () {
  yield all([
    fork(sessionSaga),
    fork(navigationSaga),
    fork(eventSaga),
    fork(profileSaga),
    fork(welcomeSaga),
    fork(calendarSaga),
    fork(pushNotificationsSaga),
    fork(pizzaSaga),
    fork(photosSaga),
    fork(registrationSaga),
    fork(deepLinkingSaga),
    fork(membersSaga),
    fork(settingsSaga),
  ]);
}
