import * as types from './actionTypes';

export function enterUsername(username) {
  return {
    type: types.ENTER_USERNAME,
    username,
  };
}

export function enterPassword(password) {
  return {
    type: types.ENTER_PASSWORD,
    password,
  };
}

export function login() {
  return {
    type: types.LOGIN,
  };
}
