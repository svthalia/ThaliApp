import {
  SERVER_URL as ENV_SERVER_URL,
  OAUTH_CLIENT_ID,
  OAUTH_REDIRECT_URL,
  // eslint-disable-next-line import/no-unresolved
} from '@env';

const SERVER_URL = ENV_SERVER_URL || 'https://thalia.nu';
const API_URL = `${SERVER_URL}/api/v1`;
const DEFAULT_PROFILE_PHOTO = `${SERVER_URL}/static/members/images/default-avatar.jpg`;
const TERMS_CONDITIONS_URL = `${SERVER_URL}/event-registration-terms/`;

const OAUTH_CONFIG = {
  serviceConfiguration: {
    authorizationEndpoint: `${SERVER_URL}/user/oauth/authorize/`,
    tokenEndpoint: `${SERVER_URL}/user/oauth/token/`,
    revocationEndpoint: `${SERVER_URL}/user/oauth/revoke_token/`,
  },
  clientId: OAUTH_CLIENT_ID,
  redirectUrl: OAUTH_REDIRECT_URL,
  scopes: ['members:read'],
  // eslint-disable-next-line no-undef
  dangerouslyAllowInsecureHttpRequests: __DEV__,
};

export {
  SERVER_URL,
  API_URL,
  DEFAULT_PROFILE_PHOTO,
  TERMS_CONDITIONS_URL,
  OAUTH_CONFIG,
};
