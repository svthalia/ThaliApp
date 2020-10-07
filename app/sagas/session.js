import {
  call, put, takeEvery, select, delay,
} from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import * as Sentry from '@sentry/react-native';
import i18next from '../utils/i18n';

import { apiRequest } from '../utils/url';
import * as sessionActions from '../actions/session';
import * as pushNotificationsActions from '../actions/pushNotifications';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

export const IDENTIFIERKEY = '@MyStore:identifier';
export const USERNAMEKEY = '@MyStore:username';
export const TOKENKEY = '@MyStore:token';
export const DISPLAYNAMEKEY = '@MyStore:displayName';
export const PHOTOKEY = '@MyStore:photo';
export const PUSHCATEGORYKEY = '@MyStore:pushCategories';

const pairsToObject = (obj, pair) => {
  const obj2 = { ...obj };
  obj2[pair[0]] = pair[1];
  return obj2;
};

const t = i18next.getFixedT(undefined, 'sagas/session');

function* init() {
  try {
    const result = yield call(
      [AsyncStorage, 'multiGet'],
      [
        IDENTIFIERKEY,
        USERNAMEKEY,
        TOKENKEY,
        DISPLAYNAMEKEY,
        PHOTOKEY,
        PUSHCATEGORYKEY,
      ],
    );
    const values = result.reduce(pairsToObject, {});

    const id = parseInt(values[IDENTIFIERKEY], 10);
    const username = values[USERNAMEKEY];
    const token = values[TOKENKEY];
    const displayName = values[DISPLAYNAMEKEY];
    const photo = values[PHOTOKEY];
    const pushCategories = JSON.parse(values[PUSHCATEGORYKEY]);

    if (username !== null && token !== null) {
      yield put(sessionActions.signedIn(username, token));
      yield put(sessionActions.setUserInfo(id, displayName, photo));
      yield put(sessionActions.fetchUserInfo());
      yield put(pushNotificationsActions.register(pushCategories));
    } else {
      yield put(sessionActions.tokenInvalid());
    }
  } catch (e) {
    yield call(reportError, e);
  }
}

function* signIn(action) {
  const { user, pass } = action.payload;
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user,
      password: pass,
    }),
  };

  const currentTimestamp = Date.now();
  try {
    const response = yield call(apiRequest, 'token-auth', data);
    const { token } = response;

    yield call(AsyncStorage.multiSet, [
      [USERNAMEKEY, user],
      [TOKENKEY, token],
    ]);
    yield put(sessionActions.signedIn(user, token));
    yield put(sessionActions.fetchUserInfo());
    yield put(pushNotificationsActions.register());
    yield call([Snackbar, 'show'], { text: t('Login successful') });
  } catch (e) {
    // Delay failure to make sure animation is finished
    const now = Date.now();
    if (now - currentTimestamp < 150) {
      yield delay(now - currentTimestamp);
    }

    yield put(sessionActions.tokenInvalid());
    yield call(reportError, e);
    yield call([Snackbar, 'show'], { text: t('Login failed') });
  }
}

function* clearUserInfo() {
  yield call(
    [AsyncStorage, 'multiRemove'],
    [
      IDENTIFIERKEY,
      USERNAMEKEY,
      TOKENKEY,
      DISPLAYNAMEKEY,
      PHOTOKEY,
      PUSHCATEGORYKEY,
    ],
  );
  yield put(pushNotificationsActions.invalidate());
}

function* signOut() {
  yield call(clearUserInfo);
  yield call([Snackbar, 'show'], { text: t('Logout successful') });
}

function* signedIn({ payload }) {
  const { username } = payload;
  yield call(Sentry.setContext, 'user', { username });
}

function* userInfo() {
  const token = yield select(tokenSelector);

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const userProfile = yield call(apiRequest, 'members/me', data);

    yield call(AsyncStorage.multiSet, [
      [IDENTIFIERKEY, userProfile.pk.toString()],
      [DISPLAYNAMEKEY, userProfile.display_name],
      [PHOTOKEY, userProfile.avatar.medium],
    ]);
    yield put(
      sessionActions.setUserInfo(
        userProfile.pk,
        userProfile.display_name,
        userProfile.avatar.medium,
      ),
    );
  } catch (error) {
    yield call(reportError, error);
  }
}

export default function* () {
  yield takeEvery(sessionActions.INIT, init);
  yield takeEvery(sessionActions.SIGN_IN, signIn);
  yield takeEvery(sessionActions.SIGN_OUT, signOut);
  yield takeEvery(sessionActions.SIGNED_IN, signedIn);
  yield takeEvery(sessionActions.FETCH_USER_INFO, userInfo);
  yield takeEvery(sessionActions.TOKEN_INVALID, clearUserInfo);
}
