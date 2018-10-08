import locale from 'react-native-locale-detector';

let server = 'https://thalia.nu';
/* istanbul ignore next line */
if (__DEV__) { // eslint-disable-line no-undef
  server = 'http://localhost:8000';
}

export const url = server;
export const apiUrl = `${server}/api/v1`;
export const defaultProfileImage = `${server}/static/members/images/default-avatar.jpg`;
export const termsAndConditionsUrl = `${server}/event-registration-terms/`;

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
  const responseCopy = response.clone();

  if (response.status === 403) {
    return response.json().then((json) => {
      const contentLang = response.headers.get('content-language');
      if ((contentLang === 'en' && json.detail === 'Invalid token.')
        || (contentLang === 'nl' && json.detail === 'Ongeldige token.')) {
        throw new TokenInvalidError(responseCopy);
      }
      return responseCopy;
    });
  }
  return Promise.resolve(responseCopy);
};

export const apiRequest = (route, fetchOpts, params) => {
  const requestOptions = fetchOpts;
  if (!requestOptions.headers) {
    requestOptions.headers = {};
  }

  if (locale.includes('en') || locale.includes('nl')) {
    requestOptions.headers['Accept-Language'] = locale;
  } else {
    requestOptions.headers['Accept-Language'] = 'en';
  }

  let query = '';
  if (params !== null && params === Object(params)) {
    query = `?${Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }

  return fetch(`${apiUrl}/${route}/${query}`, requestOptions)
    .then(detectInvalidToken)
    .then((response) => {
      if (response.status >= 400 && response.status <= 500) {
        throw new ServerError(`Invalid status code: ${response.status}`, response);
      } else if (response.status === 204) {
        return {};
      }
      return response.json();
    });
};
