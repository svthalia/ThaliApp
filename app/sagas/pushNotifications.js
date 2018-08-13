import { call, takeEvery, select } from 'redux-saga/effects';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as pushNotificationsActions from '../actions/pushNotifications';

const register = function* register(action) {
  const messaging = firebase.messaging();
  const token = yield select(tokenSelector);
  const { categories } = action;

  if (token === undefined) {
    // There is no token, thus do nothing
    return;
  }

  const hasPermission = yield call([messaging, 'hasPermission']);

  let pushToken;
  if (Platform.OS === 'ios' && !hasPermission) {
    try {
      // this throws an error when the permissions are denied
      yield call([messaging, 'requestPermission']);
      pushToken = yield call([messaging, 'getToken']);
    } catch (err) {
      // return and do nothing since we have no token
      return;
    }
  } else {
    pushToken = yield call([messaging, 'getToken']);
  }

  const body = {
    registration_id: pushToken,
    type: Platform.OS,
  };

  if (categories !== null) {
    body.receive_category = categories;
  }

  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    yield call(apiRequest, 'devices', data);
  } catch (err) {
    Sentry.captureException(err);
    // eat error, om nom nom
  }
};

const invalidate = function* invalidate() {
  yield call([firebase.iid(), 'delete']);
};

const pushNotificationsSaga = function* pushNotificationsSaga() {
  yield takeEvery(pushNotificationsActions.REGISTER, register);
  yield takeEvery(pushNotificationsActions.INVALIDATE, invalidate);
};

export default pushNotificationsSaga;
