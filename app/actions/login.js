import * as types from './actionTypes';

const apiKey = 'AiYinaeng4juw1cae1eiLe2Adei2Ahbahda3AiRu';

export function loginSuccess(username) {
  return {
    type: types.LOGINSUCCESS,
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginProgress());
    data = {
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
            console.log(responseJson);
            return dispatch(loginSuccess(username));
          }

          return dispatch(loginFailure());
        })
      .catch((error) => {
        console.error(error);
        return dispatch(loginFailure());
      });
  };
}

export function loginProgress() {
  return {
    type: types.LOGINPROGRESS,
  };
}

export function loginFailure() {
  return {
    type: types.LOGINFAILURE,
  };
}
