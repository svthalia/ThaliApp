/* eslint-disable max-classes-per-file */
let server = 'https://thalia.nu';
/* istanbul ignore next line */
// eslint-disable-next-line no-undef
if (__DEV__) {
  server = 'http://localhost:8000';
}

export const url = server;
export const apiUrl = `${server}/api/v1`;
export const defaultProfileImage = `${server}/static/members/images/default-avatar.jpg`;
export const termsAndConditionsUrl = `${server}/event-registration-terms/`;
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
    if (response.jsonData.detail === 'Invalid token.') {
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
