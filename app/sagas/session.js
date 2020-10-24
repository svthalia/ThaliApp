import { call, put, takeEvery, delay } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import * as Sentry from '@sentry/react-native';
import { authorize, refresh } from 'react-native-app-auth';
import { OAUTH_CONFIG } from '../constants';

import * as sessionActions from '../actions/session';
import * as pushNotificationsActions from '../actions/pushNotifications';
import reportError from '../utils/errorReporting';
import { getRequest } from './utils/api';

export const USER_ID = 'userId';
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const TOKEN_EXPIRATION = 'tokenExpiration';
export const DISPLAY_NAME = 'displayName';
export const PROFILE_PHOTO = 'profilePhoto';
export const PUSH_CATEGORIES = '@MyStore:pushCategories';

function* authorizeUser(currentRefreshToken = null) {
  let result;

  if (currentRefreshToken) {
    result = yield call(refresh, OAUTH_CONFIG, { currentRefreshToken });
  } else {
    result = yield call(authorize, OAUTH_CONFIG);
  }

  const {
    accessToken,
    refreshToken,
    accessTokenExpirationDate: tokenExpiration,
  } = result;

  yield call(
    [AsyncStorage, 'multiSet'],
    [
      [ACCESS_TOKEN, accessToken],
      [REFRESH_TOKEN, refreshToken],
      [TOKEN_EXPIRATION, tokenExpiration],
    ]
  );

  return { accessToken, refreshToken, tokenExpiration };
}

function* init() {
  try {
    const result = yield call(
      [AsyncStorage, 'multiGet'],
      [
        ACCESS_TOKEN,
        REFRESH_TOKEN,
        TOKEN_EXPIRATION,
        USER_ID,
        DISPLAY_NAME,
        PROFILE_PHOTO,
        PUSH_CATEGORIES,
      ]
    );

    const values = result.reduce((obj, pair) => {
      const obj2 = { ...obj };
      obj2[pair[0]] = pair[1];
      return obj2;
    }, {});

    if (values[ACCESS_TOKEN] !== null && values[USER_ID] !== null) {
      yield put(
        sessionActions.signedIn(
          values[ACCESS_TOKEN],
          values[REFRESH_TOKEN],
          values[TOKEN_EXPIRATION]
        )
      );
      yield put(
        sessionActions.setUserInfo(
          parseInt(values[USER_ID], 10),
          values[DISPLAY_NAME],
          values[PROFILE_PHOTO]
        )
      );
      yield put(sessionActions.fetchUserInfo());
      yield put(pushNotificationsActions.register(JSON.parse(values[PUSH_CATEGORIES])));
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
    console.error(JSON.stringify(e));
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
      USER_ID,
      ACCESS_TOKEN,
      REFRESH_TOKEN,
      TOKEN_EXPIRATION,
      DISPLAY_NAME,
      PROFILE_PHOTO,
      PUSH_CATEGORIES,
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
      [USER_ID, userProfile.pk.toString()],
      [DISPLAY_NAME, userProfile.display_name],
      [PROFILE_PHOTO, userProfile.avatar.medium],
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
