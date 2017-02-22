import * as types from './actionTypes';

export function loginSuccess(username) {
  return {
    type: types.LOGINSUCCESS,
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(loginProgress());
    return fetch('https://thalia.nu/api/login', {
      method: 'POST',
    })
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          console.log(responseJson);
          if(password === '42'){
            console.log(responseJson);
            return dispatch(loginSuccess(username))
          }
          else{
            return dispatch(loginFailure());
          }
        })
      .catch(error => {
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

export function loginFailure(){
  return{
    type: types.LOGINFAILURE,
  };
}
