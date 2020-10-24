import { STATUS_SIGNED_IN } from '../reducers/session';

export const accessTokenSelector = (state) => state.session.accessToken;
export const refreshTokenSelector = (state) => state.session.refreshToken;
export const tokenExpirationSelector = (state) => state.session.tokenExpiration;
export const loggedInSelector = (state) => state.session.status === STATUS_SIGNED_IN;
