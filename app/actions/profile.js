import * as types from './actionTypes';
import { navigate } from './navigation';

import { apiUrl } from '../url';

export function success(profile) {
  return {
    type: types.LOADPROFILESUCCESS,
    profile,
  };
}

export function fail() {
  return {
    type: types.LOADPROFILEFAILURE,
  };
}

export function loadProfile(token, member = 'me') {
  return (dispatch) => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    return fetch(`${apiUrl}/members/${member}/`, data)
      .then(
        response => response.json(),
      )
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(navigate('profile'));
        },
      )
      .catch(
        () => {
          dispatch(fail());
          dispatch(navigate('profile'));
        },
      );
  };
}
