export const LOGIN = 'SESSION_LOGIN';
export const INIT = 'SESSION_INIT';
export const SUCCESS = 'SESSION_SUCCESS';
export const LOGOUT = 'SESSION_LOGOUT';
export const TOKEN_INVALID = 'SESSION_TOKEN_INVALID';
export const PROFILE = 'SESSION_PROFILE';
export const PROFILE_SUCCESS = 'SESSION_PROFILE_SUCCESS';

export function success(username, token) {
  return { type: SUCCESS, payload: { username, token } };
}

export function login(user, pass) {
  return { type: LOGIN, payload: { user, pass } };
}

export function init() {
  return { type: INIT };
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
