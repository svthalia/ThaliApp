import * as types from './actionTypes';
import { navigate } from './navigation';
import { url } from '../url';

export function success(type, data) {
  return {
    type,
    data,
  };
}

export function fail(type) {
  return {
    type,
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
          dispatch(success(types.LOADEVENTSUCCESS, response));
          dispatch(navigate('event'));
        },
      )
      .catch(
        () => {
          dispatch(fail(types.LOADEVENTFAILURE));
          dispatch(navigate('event'));
        },
      );
  };
}

export function loadRegistrations(id, token) {
  return (dispatch) => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    return fetch(`${url}/api/events/${id}/registrations`, data)
      .then(
        response => response.json(),
      )
      .then(
        (response) => {
          dispatch(success(types.LOADEVENTREGISTRATIONSSUCCESS, response));
        },
      )
      .catch(
        () => {
          dispatch(fail(types.LOADEVENTREGISTRATIONSFAILURE));
        },
      );
  };
}
