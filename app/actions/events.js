import * as types from './actionTypes';
import { navigate } from './navigation';
import { apiUrl } from '../url';

export function start() {
  return {
    type: types.LOADEVENTSTART,
  };
}

export function success(data, registrations) {
  return {
    type: types.LOADEVENTSUCCESS,
    data,
    registrations,
  };
}

export function fail() {
  return {
    type: types.LOADEVENTFAILURE,
  };
}

function loadRegistrations(id, token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };
  return fetch(`${apiUrl}/events/${id}/registrations/?status=registered`, data)
    .then(
      response => response.json(),
    )
    .catch(
      () => [],
    );
}


export function loadEvent(id, token) {
  return (dispatch) => {
    dispatch(start());
    dispatch(navigate('event'));

    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };
    return fetch(`${apiUrl}/events/${id}/`, data)
      .then(
        response => response.json(),
      )
      .then(
        (response) => {
          if (response.status > -1) {
            loadRegistrations(id, token)
              .then(registrations => dispatch(success(response, registrations)));
          } else {
            dispatch(success(response, []));
          }
        },
      )
      .catch(
        () => dispatch(fail())
      );
  };
}
