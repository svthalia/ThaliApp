export const LOGIN = 'LOGIN_LOGIN';
export const FETCHING = 'LOGIN_FETCHING';
export const SUCCESS = 'LOGIN_SUCCESS';
export const FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGIN_LOGOUT';
export const RESET = 'LOGIN_RESET';

export function reset() {
  return { type: RESET };
}

export function success(username, token, displayName, photo, loginState = 'success') {
  return { type: SUCCESS, payload: { username, token, displayName, photo, loginState } };
}

export function fetching() {
  return { type: FETCHING };
}

export function failure() {
  return { type: FAILURE };
}

export function login(user, pass) {
  return { type: LOGIN, payload: { user, pass } };
}

export function logout() {
  return { type: LOGOUT };
}
