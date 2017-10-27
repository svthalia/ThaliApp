import { call, takeEvery, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import Snackbar from 'react-native-snackbar';

import { apiRequest, url } from '../url';
import * as loginActions from '../actions/login';
import * as pushNotificationsActions from '../actions/pushNotifications';

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';

const defaultAvatar = `${url}/static/members/images/default-avatar.jpg`;

const login = function* login(action) {
  const { user, pass } = action.payload;

  Snackbar.show({ title: 'Logging in', duration: Snackbar.LENGTH_INDEFINITE });

  let data = {
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
    let response = yield call(apiRequest, 'token-auth', data);
    const { token } = response;
    data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    response = yield call(apiRequest, 'members/me', data);
    const displayName = response.display_name;
    const avatar = response.photo === null ? defaultAvatar : response.photo;
    yield call(AsyncStorage.multiSet, [
          [USERNAMEKEY, user],
          [TOKENKEY, token],
          [DISPLAYNAMEKEY, displayName],
          [PHOTOKEY, avatar],
    ]);
    yield put(loginActions.success(
          user, token, displayName, avatar,
      ));
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

const loginSaga = function* loginSaga() {
  yield takeEvery(loginActions.LOGIN, login);
  yield takeEvery(loginActions.LOGOUT, logout);
};

export default loginSaga;
