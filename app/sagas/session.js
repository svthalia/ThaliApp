import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as sessionActions from '../actions/session';
import * as pushNotificationsActions from '../actions/pushNotifications';
import NavigationService from '../navigation';

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

const getStoredItems = () => AsyncStorage.multiGet([
  USERNAMEKEY, TOKENKEY, DISPLAYNAMEKEY, PHOTOKEY, PUSHCATEGORYKEY,
]);

function* init() {
  try {
    const result = yield call(getStoredItems);
    const values = result.reduce(pairsToObject, {});

    const username = values[USERNAMEKEY];
    const token = values[TOKENKEY];
    const displayName = values[DISPLAYNAMEKEY];
    const photo = values[PHOTOKEY];
    const pushCategories = JSON.parse(values[PUSHCATEGORYKEY]);

    if (username !== null && token !== null) {
      yield put(sessionActions.signedIn(username, token));
      yield put(sessionActions.setUserInfo(displayName, photo));
      yield put(sessionActions.fetchUserInfo());
      yield put(pushNotificationsActions.register(pushCategories));
    } else {
      yield call(NavigationService.navigate, 'Auth');
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}

function* signIn(action) {
  const { user, pass } = action.payload;

  Snackbar.show({ title: 'Logging in', duration: Snackbar.LENGTH_INDEFINITE });

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
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login successful' });
  } catch (e) {
    Sentry.captureException(e);
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login failed' });
  }
}

function* signOut() {
  yield call(AsyncStorage.clear);
  yield put(pushNotificationsActions.invalidate());
  Snackbar.show({ title: 'Logout successful' });
}

function* signedIn({ payload }) {
  const { username } = payload;
  yield call(NavigationService.navigate, 'SignedIn');
  yield call(Sentry.setUserContext, { username });
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
      [DISPLAYNAMEKEY, userProfile.display_name],
      [PHOTOKEY, userProfile.avatar.medium],
    ]);
    yield put(sessionActions.setUserInfo(userProfile.display_name, userProfile.avatar.medium));
  } catch (error) {
    Sentry.captureException(error);
  }
}

function* tokenInvalid() {
  yield call(AsyncStorage.clear);
  yield put(pushNotificationsActions.invalidate());
  yield call(NavigationService.navigate, 'Auth');
}

const sessionSaga = function* sessionSaga() {
  yield takeEvery(sessionActions.INIT, init);
  yield takeEvery(sessionActions.SIGN_IN, signIn);
  yield takeEvery(sessionActions.SIGN_OUT, signOut);
  yield takeEvery(sessionActions.SIGNED_IN, signedIn);
  yield takeEvery(sessionActions.FETCH_USER_INFO, userInfo);
  yield takeEvery(sessionActions.TOKEN_INVALID, tokenInvalid);
};

export default sessionSaga;
