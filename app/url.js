let server = 'https://thalia.nu';
if (__DEV__) { // eslint-disable-line no-undef
  server = 'http://localhost:8000';
}

export const url = server;
export const apiUrl = `${server}/api/v1`;
export const pizzaUrl = 'https://pizza.thalia.nu';

export const apiRequest = (route, data) => fetch(`${apiUrl}/${route}/`, data).then(response => response.json());
