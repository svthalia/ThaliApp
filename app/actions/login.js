import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';

export function loginSuccess(username, token) {
  return {
    type: types.LOGINSUCCESS,
    loginState: 'loggedIn',
    username,
    token,
  };
}

export function loginProgress() {
  return {
    type: types.LOGINPROGRESS,
    loginState: 'progress',
  };
}

export function loginFailure() {
  return {
    type: types.LOGINFAILURE,
    loginState: 'failure',
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginProgress());
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    };
    return fetch('http://localhost:8000/api/token-auth/', data)
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          if (responseJson.token) {
            return AsyncStorage.multiSet([[USERNAMEKEY, username], [TOKENKEY, responseJson.token]])
              .then(
                () => dispatch(loginSuccess(username, responseJson.token)),
              );
          }
          return dispatch(loginFailure());
        })
      .catch(() => dispatch(loginFailure()));
  };
}

export function logout() {
  AsyncStorage.multiRemove([USERNAMEKEY, TOKENKEY]);
  return {
    type: types.LOGOUT,
  };
}
