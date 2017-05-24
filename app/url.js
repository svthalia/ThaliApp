let server = 'https://thalia.nu';
if (__DEV__) { // eslint-disable-line no-undef
  server = 'http://localhost:8000';
}

export const url = server;
