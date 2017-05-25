import * as types from './actionTypes';
import { navigate } from './navigation';
import { url } from '../url';

export function success(data) {
  return {
    type: types.LOADEVENTSUCCESS,
    data,
  };
}

export function fail() {
  return {
    type: types.LOADEVENTFAILURE,
  };
}

export function loadEvent(id, token) {
  return (dispatch) => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    return fetch(`${url}/api/events/${id}/`, data)
      .then(
        response => response.json(),
      )
      .then(
        (response) => {
          dispatch(success(response));
          dispatch(navigate('event'));
        },
      )
      .catch(
        () => {
          dispatch(fail());
          dispatch(navigate('event'));
        },
      );
  };
}
