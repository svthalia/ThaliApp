import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import { url } from '../url';

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';

const defaultAvatar = `${url}/static/members/images/default-avatar.jpg`;


export function loginSuccess(username, token, displayName, photo) {
  return {
    type: types.LOGINSUCCESS,
    loginState: 'loggedIn',
    username,
    token,
    displayName,
    photo,
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

function getUserInfo(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  return fetch(`${url}/api/members/me/`, data)
    .then(
      response => response.json())
    .then(
      (responseJson) => {
        const avatar = responseJson.photo === null ? defaultAvatar : responseJson.photo;
        return {
          photo: avatar,
          displayName: responseJson.display_name,
        };
      },
    )
    .catch(
      () => ({
        photo: defaultAvatar,
        displayName: 'Naamloos',
      }),
    );
}

export function login(user, pass) {
  return (dispatch) => {
    dispatch(loginProgress());
    const data = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    };
    return fetch(`${url}/api/token-auth/`, data)
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          if (responseJson.token) {
            const token = responseJson.token;
            return getUserInfo(token)
              .then(
                  userInfo => AsyncStorage.multiSet([
                        [USERNAMEKEY, user],
                        [TOKENKEY, token],
                        [DISPLAYNAMEKEY, userInfo.displayName],
                        [PHOTOKEY, userInfo.photo],
                  ])
                    .then(() => dispatch(
                          loginSuccess(
                            user, token, userInfo.displayName, userInfo.photo,
                            )),
                        ));
          }
          return dispatch(loginFailure());
        })
      .catch(() => dispatch(loginFailure()));
  };
}

export function logout() {
  AsyncStorage.multiRemove([USERNAMEKEY, TOKENKEY]);
  return {
    type: types.LOGOUT,
  };
}
