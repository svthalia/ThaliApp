let server = 'https://thalia.nu';
if (__DEV__) { // eslint-disable-line no-undef
  server = 'http://localhost:8000';
}

export const url = server;
export const apiUrl = `${server}/api/v1`;
export const pizzaUrl = 'https://pizza.thalia.nu';
export const defaultProfileImage = `${server}/static/members/images/default-avatar.jpg`;
export const tokenSelector = state => state.session.token;
export const loggedInSelector = state => state.navigation.loggedIn;

export class ServerError extends Error {
  constructor(message, response) {
    super(message);
    this.name = this.constructor.name;
    this.response = response;
  }
}

export const apiRequest = (route, fetchOpts, params) => {
  let query = '';
  if (params !== null && params === Object(params)) {
    query = `?${Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }
  return fetch(`${apiUrl}/${route}/${query}`, fetchOpts)
    .then((response) => {
      if (response.status >= 400 && response.status <= 500) {
        throw new ServerError(`Invalid status code: ${response.status}`, response);
      } else if (response.status === 204) {
        return {};
      }
      return response.json();
    });
};
