import { call, put, takeEvery, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import * as Sentry from '@sentry/react-native';

import * as sessionActions from '../actions/session';
import * as pushNotificationsActions from '../actions/pushNotifications';
import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_DISPLAY_NAME,
  STORAGE_PROFILE_PHOTO,
  STORAGE_PUSH_CATEGORIES,
  STORAGE_REFRESH_TOKEN,
  STORAGE_TOKEN_EXPIRATION,
  STORAGE_USER_ID,
} from '../constants';
import reportError from '../utils/errorReporting';
import { authorizeUser, getRequest } from './utils/api';

function* init() {
  try {
    const result = yield call(
      [AsyncStorage, 'multiGet'],
      [
        STORAGE_ACCESS_TOKEN,
        STORAGE_REFRESH_TOKEN,
        STORAGE_TOKEN_EXPIRATION,
        STORAGE_USER_ID,
        STORAGE_DISPLAY_NAME,
        STORAGE_PROFILE_PHOTO,
        STORAGE_PUSH_CATEGORIES,
      ]
    );

    const values = result.reduce((obj, pair) => {
      const obj2 = { ...obj };
      obj2[pair[0]] = pair[1];
      return obj2;
    }, {});

    if (values[STORAGE_ACCESS_TOKEN] !== null && values[STORAGE_USER_ID] !== null) {
      yield put(
        sessionActions.signedIn(
          values[STORAGE_ACCESS_TOKEN],
          values[STORAGE_REFRESH_TOKEN],
          values[STORAGE_TOKEN_EXPIRATION]
        )
      );
      yield put(
        sessionActions.setUserInfo(
          parseInt(values[STORAGE_USER_ID], 10),
          values[STORAGE_DISPLAY_NAME],
          values[STORAGE_PROFILE_PHOTO]
        )
      );
      yield put(sessionActions.fetchUserInfo());
      yield put(
        pushNotificationsActions.register(JSON.parse(values[STORAGE_PUSH_CATEGORIES]))
      );
    } else {
      yield put(sessionActions.tokenInvalid());
    }
  } catch (e) {
    yield call(reportError, e);
  }
}

function* signIn() {
  const currentTimestamp = Date.now();
  try {
    const { accessToken, refreshToken, tokenExpiration } = yield call(authorizeUser);

    yield put(sessionActions.signedIn(accessToken, refreshToken, tokenExpiration));
    yield put(sessionActions.fetchUserInfo());
    yield put(pushNotificationsActions.register());
    yield call([Snackbar, 'show'], { text: 'Login successful' });
  } catch (e) {
    // Delay failure to make sure animation is finished
    const now = Date.now();
    if (now - currentTimestamp < 150) {
      yield delay(now - currentTimestamp);
    }

    yield put(sessionActions.tokenInvalid());
    yield call(reportError, e);
    yield call([Snackbar, 'show'], { text: 'Login failed' });
  }
}

function* clearUserInfo() {
  yield call(
    [AsyncStorage, 'multiRemove'],
    [
      STORAGE_USER_ID,
      STORAGE_ACCESS_TOKEN,
      STORAGE_REFRESH_TOKEN,
      STORAGE_TOKEN_EXPIRATION,
      STORAGE_DISPLAY_NAME,
      STORAGE_PROFILE_PHOTO,
      STORAGE_PUSH_CATEGORIES,
    ]
  );
  yield put(pushNotificationsActions.invalidate());
}

function* signOut() {
  yield call(clearUserInfo);
  yield call([Snackbar, 'show'], { text: 'Logout successful' });
}

function* signedIn({ payload }) {
  const { username } = payload;
  yield call(Sentry.setContext, 'user', { username });
}

function* userInfo() {
  try {
    const userProfile = yield call(getRequest, 'members/me');

    yield call(AsyncStorage.multiSet, [
      [STORAGE_USER_ID, userProfile.pk.toString()],
      [STORAGE_DISPLAY_NAME, userProfile.display_name],
      [STORAGE_PROFILE_PHOTO, userProfile.avatar.medium],
    ]);
    yield put(
      sessionActions.setUserInfo(
        userProfile.pk,
        userProfile.display_name,
        userProfile.avatar.medium
      )
    );
  } catch (error) {
    yield call(reportError, error);
  }
}

export default function* sessionSaga() {
  yield takeEvery(sessionActions.INIT, init);
  yield takeEvery(sessionActions.SIGN_IN, signIn);
  yield takeEvery(sessionActions.SIGN_OUT, signOut);
  yield takeEvery(sessionActions.SIGNED_IN, signedIn);
  yield takeEvery(sessionActions.FETCH_USER_INFO, userInfo);
  yield takeEvery(sessionActions.TOKEN_INVALID, clearUserInfo);
}
