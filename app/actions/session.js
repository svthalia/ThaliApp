export const INIT = 'SESSION_INIT';
export const SIGN_IN = 'SESSION_SIGN_IN';
export const SIGNED_IN = 'SESSION_SIGNED_IN';
export const SIGN_OUT = 'SESSION_SIGN_OUT';
export const TOKEN_INVALID = 'SESSION_TOKEN_INVALID';
export const FETCH_USER_INFO = 'SESSION_FETCH_USER_INFO';
export const SET_USER_INFO = 'SESSION_SET_USER_INFO';

export function init() {
  return { type: INIT };
}

export function signIn() {
  return { type: SIGN_IN };
}

export function signOut() {
  return { type: SIGN_OUT };
}

export function signedIn(accessToken, refreshToken, tokenExpiration) {
  return { type: SIGNED_IN, payload: { accessToken, refreshToken, tokenExpiration } };
}

export function tokenInvalid() {
  return { type: TOKEN_INVALID };
}

export function fetchUserInfo() {
  return { type: FETCH_USER_INFO };
}

export function setUserInfo(pk, displayName, photo) {
  return { type: SET_USER_INFO, payload: { pk, displayName, photo } };
}
