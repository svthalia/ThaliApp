import { call, put, takeEvery } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Sentry } from 'react-native-sentry';

import { apiRequest } from '../utils/url';
import * as sessionActions from '../actions/session';
import * as pushNotificationsActions from '../actions/pushNotifications';
import { navigate } from '../actions/navigation';
import { LOGIN_SCENE, WELCOME_SCENE } from '../ui/components/navigator/scenes';

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
      yield put(sessionActions.success(username, token));
      yield put(sessionActions.profileSuccess(displayName, photo));
      yield put(sessionActions.profile(token));
      yield put(pushNotificationsActions.register(pushCategories));
    } else {
      yield put(navigate(LOGIN_SCENE, true));
    }
  } catch (e) {
    Sentry.captureException(e);
  }
}

function* login(action) {
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
    yield put(sessionActions.success(user, token));
    yield put(sessionActions.profile(token));
    yield put(pushNotificationsActions.register());
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login successful' });
  } catch (error) {
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login failed' });
  }
}

function* logout() {
  yield call(AsyncStorage.multiRemove, [USERNAMEKEY, TOKENKEY]);
  yield put(pushNotificationsActions.invalidate());
  Snackbar.show({ title: 'Logout successful' });
}

function* tokenInvalid() {
  yield call(AsyncStorage.clear);
  yield put(pushNotificationsActions.invalidate());
}

function* profile(action) {
  const { token } = action.payload;

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
    yield put(sessionActions.profileSuccess(userProfile.display_name, userProfile.avatar.medium));
  } catch (error) {
    Sentry.captureException(error);
  }
}

function* success({ payload }) {
  const { username } = payload;
  yield put(navigate(WELCOME_SCENE, true));
  yield call(Sentry.setUserContext, { username });
}

const sessionSaga = function* sessionSaga() {
  yield takeEvery(sessionActions.INIT, init);
  yield takeEvery(sessionActions.LOGIN, login);
  yield takeEvery(sessionActions.LOGOUT, logout);
  yield takeEvery(sessionActions.PROFILE, profile);
  yield takeEvery(sessionActions.TOKEN_INVALID, tokenInvalid);
  yield takeEvery(sessionActions.SUCCESS, success);
};

export default sessionSaga;
