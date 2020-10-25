import {
  SERVER_URL as ENV_SERVER_URL,
  OAUTH_CLIENT_ID,
// eslint-disable-next-line import/no-unresolved
} from '@env';

export const SERVER_URL = ENV_SERVER_URL || 'https://thalia.nu';
export const API_URL = `${SERVER_URL}/api/v1`;
export const DEFAULT_PROFILE_PHOTO = `${SERVER_URL}/static/members/images/default-avatar.jpg`;
export const TERMS_CONDITIONS_URL = `${SERVER_URL}/event-registration-terms/`;

export const OAUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: `${SERVER_URL}/user/oauth/authorize/`,
    tokenEndpoint: `${SERVER_URL}/user/oauth/token/`,
    revocationEndpoint: `${SERVER_URL}/user/oauth/revoke_token/`,
  },
  clientId: OAUTH_CLIENT_ID,
  redirectUrl: 'nu.thalia://oauth',
  scopes: ['members:read'],
  // eslint-disable-next-line no-undef
  dangerouslyAllowInsecureHttpRequests: __DEV__,
};

export const STORAGE_USER_ID = 'userId';
export const STORAGE_ACCESS_TOKEN = 'accessToken';
export const STORAGE_REFRESH_TOKEN = 'refreshToken';
export const STORAGE_TOKEN_EXPIRATION = 'tokenExpiration';
export const STORAGE_DISPLAY_NAME = 'displayName';
export const STORAGE_PROFILE_PHOTO = 'profilePhoto';
export const STORAGE_PUSH_CATEGORIES = '@MyStore:pushCategories';
