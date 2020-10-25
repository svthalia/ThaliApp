/* eslint-disable max-classes-per-file */
import AsyncStorage from '@react-native-community/async-storage';
import { authorize, refresh } from 'react-native-app-auth';
import { call, select, put } from 'redux-saga/effects';
import * as sessionActions from '../../actions/session';
import {
  API_URL,
  OAUTH_CONFIG,
  STORAGE_ACCESS_TOKEN,
  STORAGE_REFRESH_TOKEN,
  STORAGE_TOKEN_EXPIRATION,
} from '../../constants';
import {
  accessTokenSelector,
  refreshTokenSelector,
  tokenExpirationSelector,
} from '../../selectors/session';

class ServerError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ServerError';
    this.response = response;
  }
}

export function* authorizeUser(currentRefreshToken = null) {
  let result;

  if (currentRefreshToken) {
    result = yield call(refresh, OAUTH_CONFIG, { currentRefreshToken });
  } else {
    result = yield call(authorize, OAUTH_CONFIG);
  }

  const {
    accessToken, refreshToken, accessTokenExpirationDate: tokenExpiration,
  } = result;

  yield call([AsyncStorage, 'multiSet'], [
    [STORAGE_ACCESS_TOKEN, accessToken],
    [STORAGE_REFRESH_TOKEN, refreshToken],
    [STORAGE_TOKEN_EXPIRATION, tokenExpiration],
  ]);

  return { accessToken, refreshToken, tokenExpiration };
}

function* checkTokenExpiration() {
  const tokenExpiration = yield select(tokenExpirationSelector);
  const expirationTimestamp = Date.parse(tokenExpiration);

  if (expirationTimestamp < Date.now()) {
    const refreshToken = yield select(refreshTokenSelector);
    yield call(authorizeUser, refreshToken);
  }
}

function* request(method, route, requestBody, params, opts = {}) {
  const accessToken = yield select(accessTokenSelector);

  yield call(checkTokenExpiration);

  let contentType = 'application/json';
  let body;
  if (requestBody instanceof FormData) {
    contentType = 'multipart/form-data';
    body = requestBody;
  } else if (requestBody) {
    body = JSON.stringify(requestBody);
  }

  const requestOptions = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: `Bearer ${accessToken}`,
    },
    body,
    ...opts,
  };

  let query = '';
  if (params === Object(params)) {
    query = `?${Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }

  let requestUrl = `${API_URL}/${route}/${query}`;
  if (route.startsWith('http')) {
    requestUrl = route;
  }

  const response = yield call(fetch, requestUrl, requestOptions);

  if (response.status === 403) {
    yield put(sessionActions.tokenInvalid());
  } else if (response.status >= 400 && response.status <= 500) {
    throw new ServerError(`Invalid status code: ${response.status}`, response);
  } else if (response.status === 204) {
    return {};
  }

  return yield call([response, 'json']);
}

export function* getRequest(route, params) {
  return yield call(request, 'GET', route, undefined, params);
}

export function* postRequest(route, body, params) {
  return yield call(request, 'POST', route, body, params);
}

export function* patchRequest(route, body, params) {
  return yield call(request, 'PATCH', route, body, params);
}

export function* deleteRequest(route, params) {
  return yield call(request, 'DELETE', route, undefined, params);
}
