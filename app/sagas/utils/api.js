/* eslint-disable max-classes-per-file */
import { select, call, put } from 'redux-saga/effects';
import * as sessionActions from '../../actions/session';
import { API_URL } from '../../constants';
import { accessTokenSelector } from '../../selectors/session';

class ServerError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ServerError';
    this.response = response;
  }
}

class TokenInvalidError extends Error {
  constructor(response) {
    super('Invalid token');
    this.name = 'TokenInvalidError';
    this.response = response;
  }
}

const detectInvalidToken = (response) => {
  if (response.status === 403 && response.jsonData) {
    const contentLang = response.headers.get('content-language');
    if (
      (contentLang === 'en' && response.jsonData.detail === 'Invalid token.') ||
      (contentLang === 'nl' && response.jsonData.detail === 'Ongeldige token.')
    ) {
      throw new TokenInvalidError(response);
    }
  }
  return response;
};

const apiRequest = (route, fetchOpts, params = null) => {
  const requestOptions = fetchOpts;
  if (!requestOptions.headers) {
    requestOptions.headers = {};
  }

  let query = '';
  if (params !== null && params === Object(params)) {
    query = `?${Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }

  let requestUrl = `${API_URL}/${route}/${query}`;
  if (route.startsWith('http')) {
    requestUrl = route;
  }
  return fetch(requestUrl, requestOptions)
    .then((response) =>
      response
        .json()
        .then((data) => ({ ...response, jsonData: data }))
        .catch(() => response)
    )
    .then(detectInvalidToken)
    .then((response) => {
      if (response.status >= 400 && response.status <= 500) {
        throw new ServerError(`Invalid status code: ${response.status}`, response);
      } else if (response.status === 204) {
        return {};
      }
      return response.jsonData;
    });
};

export function* request(method, route, requestBody, params) {
  const accessToken = yield select(accessTokenSelector);

  let contentType = 'application/json';
  let body;
  if (requestBody instanceof FormData) {
    contentType = 'multipart/form-data';
    body = requestBody;
  } else if (requestBody) {
    body = JSON.stringify(requestBody);
  }

  const data = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': contentType,
      Authorization: `Bearer ${accessToken}`,
    },
    body,
  };

  try {
    return yield call(apiRequest, route, data, params);
  } catch (error) {
    if (error.name === 'TokenInvalidError') {
      yield put(sessionActions.tokenInvalid());
    }
  }
  return {};
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
