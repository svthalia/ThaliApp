import { call, takeEvery, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { Sentry } from 'react-native-sentry';

import { apiRequest } from '../utils/url';
import * as loginActions from '../actions/login';
import * as pushNotificationsActions from '../actions/pushNotifications';

export const USERNAMEKEY = '@MyStore:username';
export const TOKENKEY = '@MyStore:token';
export const DISPLAYNAMEKEY = '@MyStore:displayName';
export const PHOTOKEY = '@MyStore:photo';

const login = function* login(action) {
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
    yield put(loginActions.success(user, token));
    yield put(loginActions.profile(token));
    yield put(pushNotificationsActions.register());
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login successful' });
  } catch (error) {
    Snackbar.dismiss();
    Snackbar.show({ title: 'Login failed' });
  }
};

const logout = function* logout() {
  yield call(AsyncStorage.multiRemove, [USERNAMEKEY, TOKENKEY]);
  yield put(pushNotificationsActions.invalidate());
  Snackbar.show({ title: 'Logout successful' });
};

const tokenInvalid = function* tokenInvalid() {
  yield call(AsyncStorage.clear);
  yield put(pushNotificationsActions.invalidate());
};

const profile = function* profile(action) {
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
    yield put(loginActions.profileSuccess(userProfile.display_name, userProfile.avatar.medium));
  } catch (error) {
    Sentry.captureException(error);
    // Swallow error
  }
};

function* success({ payload }) {
  const { username } = payload;
  yield call(Sentry.setUserContext, { username });
}

const loginSaga = function* loginSaga() {
  yield takeEvery(loginActions.LOGIN, login);
  yield takeEvery(loginActions.LOGOUT, logout);
  yield takeEvery(loginActions.PROFILE, profile);
  yield takeEvery(loginActions.TOKEN_INVALID, tokenInvalid);
  yield takeEvery(loginActions.SUCCESS, success);
};

export default loginSaga;
