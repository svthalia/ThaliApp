import { call, takeEvery, put } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';

import { apiRequest, url } from '../url';
import * as loginActions from '../actions/login';

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';

const defaultAvatar = `${url}/static/members/images/default-avatar.jpg`;

const login = function* login(action) {
  const { user, pass } = action.payload;
  yield put(loginActions.loginProgress());
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
    if (!token) {
      throw Error();
    }
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
    yield put(loginActions.loginSuccess(
          user, token, displayName, avatar,
      ));
  } catch (error) {
    yield put(loginActions.loginFailure());
  }
};

const loginSaga = function* loginSaga() {
  yield takeEvery(loginActions.LOGIN, login);
};

export default loginSaga;
