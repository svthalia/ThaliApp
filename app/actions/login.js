import * as types from './actionTypes';

const apiKey = 'AiYinaeng4juw1cae1eiLe2Adei2Ahbahda3AiRu';

export function loginSuccess(username, token) {
  return {
    type: types.LOGINSUCCESS,
    loginState: 'loggedIn',
    username,
    token,
  };
}

export function loginProgress() {
  return {
    type: types.LOGINPROGRESS,
    loginState: 'progress',
  };
}

export function loginFailure() {
  return {
    type: types.LOGINFAILURE,
    loginState: 'failure',
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginProgress());
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: apiKey,
        username,
        password,
      }),
    };
    return fetch('http://localhost:8000/api/login', data)
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          if (responseJson.status === 'ok') {
            return dispatch(loginSuccess(username, responseJson.token));
          }
          return dispatch(loginFailure());
        })
      .catch(() => dispatch(loginFailure()));
  };
}
