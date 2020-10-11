/* eslint-disable max-classes-per-file */
import { getLocales } from 'react-native-localize';
// eslint-disable-next-line import/no-unresolved
import { SERVER_URL } from '@env';

export const url = SERVER_URL || 'https://thalia.nu';
export const apiUrl = `${url}/api/v1`;
export const defaultProfileImage = `${url}/static/members/images/default-avatar.jpg`;
export const termsAndConditionsUrl = `${url}/event-registration-terms/`;
export const tokenSelector = (state) => state.session.token;

export class ServerError extends Error {
  constructor(message, response) {
    super(message);
    this.name = 'ServerError';
    this.response = response;
  }
}

export class TokenInvalidError extends Error {
  constructor(response) {
    super('Invalid token');
    this.name = 'TokenInvalidError';
    this.response = response;
  }
}

const detectInvalidToken = (response) => {
  if (response.status === 403 && response.jsonData) {
    const contentLang = response.headers.get('content-language');
    if ((contentLang === 'en' && response.jsonData.detail === 'Invalid token.')
      || (contentLang === 'nl' && response.jsonData.detail === 'Ongeldige token.')) {
      throw new TokenInvalidError(response);
    }
  }
  return response;
};

export const apiRequest = (route, fetchOpts, params) => {
  const requestOptions = fetchOpts;
  if (!requestOptions.headers) {
    requestOptions.headers = {};
  }

  const locale = getLocales()[0].languageCode;
  if (locale.includes('en') || locale.includes('nl')) {
    requestOptions.headers['Accept-Language'] = locale;
  } else {
    requestOptions.headers['Accept-Language'] = 'en';
  }
  let query = '';
  if (params !== null && params === Object(params)) {
    query = `?${Object.keys(params)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }

  let requestUrl = `${apiUrl}/${route}/${query}`;
  if (route.startsWith('http')) {
    requestUrl = route;
  }
  return fetch(requestUrl, requestOptions)
    .then(detectInvalidToken)
    .then((response) => response.json()
      .then((data) => ({ ...response, jsonData: data }))
      .catch(() => response))
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
