export const LOGIN = 'LOGIN_LOGIN';
export const SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGIN_LOGOUT';

export function success(username, token, displayName, photo) {
  return { type: SUCCESS, payload: { username, token, displayName, photo } };
}

export function login(user, pass) {
  return { type: LOGIN, payload: { user, pass } };
}

export function logout() {
  return { type: LOGOUT };
}
