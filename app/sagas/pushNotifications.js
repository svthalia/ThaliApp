import { call, takeEvery } from 'redux-saga/effects';
import { Platform } from 'react-native';
import FCM from 'react-native-fcm';

import { apiRequest } from '../url';
import * as pushNotificationsActions from '../actions/pushNotifications';

const register = function* register(action) {
  const { token } = action.payload;
  let pushToken;
  if (Platform.OS === 'ios') {
    pushToken = yield call(FCM.getFCMToken);
  } else {
    yield call(FCM.requestPermissions);
    pushToken = yield call(FCM.getFCMToken);
  }

  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      registration_id: pushToken,
      type: Platform.OS,
    }),
  };

  try {
    yield call(apiRequest, 'devices', data);
  } catch (err) {
    // eat error, om nom nom
  }
};

const invalidate = function* invalidate() {
  yield call(FCM.deleteInstanceId);
};

const pushNotificationsSaga = function* pushNotificationsSaga() {
  yield takeEvery(pushNotificationsActions.REGISTER, register);
  yield takeEvery(pushNotificationsActions.INVALIDATE, invalidate);
};

export default pushNotificationsSaga;
