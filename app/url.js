let server = 'https://thalia.nu';
if (__DEV__) { // eslint-disable-line no-undef
  server = 'http://localhost:8000';
}

export const url = server;
export const apiUrl = `${server}/api/v1`;
export const pizzaUrl = 'https://pizza.thalia.nu';
export const tokenSelector = state => state.session.token;

const NO_CONTENT = 204;

export const apiRequest = (route, fetchOpts, params) => {
  let query = '';
  if (params !== null && params === Object(params)) {
    query = `?${Object.keys(params)
      .map(k => `${encodeURIComponent(k)} = ${encodeURIComponent(params[k])}`)
      .join('&')}`;
  }
  return fetch(`${apiUrl}/${route}/${query}`, fetchOpts).then((response) => {
    if (response.status === NO_CONTENT) {
      return {
        success: response.ok,
        content: null,
        status: response.status,
      };
    }
    return response.json().then(json => ({
      success: response.ok,
      content: json,
      status: response.status,
    }));
  });
};
