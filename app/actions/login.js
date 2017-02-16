import * as types from './actionTypes';

export function loginold(username, password) {
  return {
    type: types.LOGIN,
    success: password === '42',
  };
}

export function login(username, password) {
  return (dispatch) => {
    return fetch('https://thalia.nu/api/login', {
      method: 'POST',
    })
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          console.log(responseJson);
          return dispatch(loginold(username, password));
        })
      .catch(error => console.error(error));
  };
}
