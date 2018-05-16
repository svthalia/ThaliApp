export const LOGIN = 'LOGIN_LOGIN';
export const SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGIN_LOGOUT';
export const TOKEN_INVALID = 'LOGIN_TOKEN_INVALID';
export const PROFILE = 'LOGIN_PROFILE';
export const PROFILE_SUCCESS = 'LOGIN_PROFILE_SUCCESS';

export function success(username, token) {
  return { type: SUCCESS, payload: { username, token } };
}

export function login(user, pass) {
  return { type: LOGIN, payload: { user, pass } };
}

export function logout() {
  return { type: LOGOUT };
}

export function tokenInvalid() {
  return { type: TOKEN_INVALID };
}

export function profile(token) {
  return { type: PROFILE, payload: { token } };
}

export function profileSuccess(displayName, photo) {
  return { type: PROFILE_SUCCESS, payload: { displayName, photo } };
}
