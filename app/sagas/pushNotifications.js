import { call, takeEvery, select } from 'redux-saga/effects';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import iid from '@react-native-firebase/iid';

import * as pushNotificationsActions from '../actions/pushNotifications';
import { accessTokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';
import { postRequest } from './utils/api';

function* register(action) {
  const accessToken = yield select(accessTokenSelector);
  const { categories } = action;

  if (!accessToken) {
    // There is no token, thus do nothing
    return;
  }

  const hasPermission = yield call([messaging(), 'hasPermission']);

  let pushToken;
  if (Platform.OS === 'ios' && !hasPermission) {
    try {
      // this throws an error when the permissions are denied
      yield call([messaging(), 'requestPermission']);
      pushToken = yield call([messaging(), 'getToken']);
    } catch (err) {
      // return and do nothing since we have no token
      return;
    }
  } else {
    pushToken = yield call([messaging(), 'getToken']);
  }

  const body = {
    registration_id: pushToken,
    type: Platform.OS,
  };

  if (categories !== null) {
    body.receive_category = categories;
  }

  try {
    yield call(postRequest, 'devices', body);
  } catch (error) {
    yield call(reportError, error);
    // eat error, om nom nom
  }
}

function* invalidate() {
  yield call([iid(), 'delete']);
}

export default function* pushNotificationsSaga() {
  yield takeEvery(pushNotificationsActions.REGISTER, register);
  yield takeEvery(pushNotificationsActions.INVALIDATE, invalidate);
}
