import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';

export const LOGIN = 'LOGIN_LOGIN';
export const LOGINPROGRESS = 'LOGINPROGRESS';
export const LOGINSUCCESS = 'LOGINSUCCESS';
export const LOGINFAILURE = 'LOGINFAILURE';
export const LOGOUT = 'LOGOUT';

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';


export function resetLogin() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: types.RESETLOGINSTATE,
      });
    }, 2000);
  };
}

export function loginSuccess(username, token, displayName, photo) {
  return (dispatch) => {
    dispatch(resetLogin());
    return dispatch({
      type: types.LOGINSUCCESS,
      username,
      token,
      displayName,
      photo,
    });
  };
}

export function loginProgress() {
  return {
    type: types.LOGINPROGRESS,
  };
}

export function loginFailure() {
  return (dispatch) => {
    dispatch(resetLogin());
    return dispatch({
      type: types.LOGINFAILURE,
    });
  };
}

export function logoutSuccess() {
  return (dispatch) => {
    dispatch(resetLogin());
    return dispatch({
      type: types.LOGOUT,
    });
  };
}

export function login(user, pass) {
  return { type: LOGIN, payload: { user, pass } };
}

export function logout() {
  return dispatch => AsyncStorage.multiRemove([USERNAMEKEY, TOKENKEY])
      .then(dispatch(logoutSuccess()));
}
