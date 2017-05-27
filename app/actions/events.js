import * as types from './actionTypes';
import { navigate } from './navigation';
import { url } from '../url';

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
  return fetch(`${url}/api/events/${id}/registrations`, data)
    .then(
      response => response.json(),
    )
    .then(
      response => response,
    )
    .catch(
      () => [],
    );
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
          if (response.status > -1) {
            loadRegistrations(id, token)
              .then((registrations) => {
                dispatch(success(response, registrations));
                dispatch(navigate('event'));
              });
          } else {
            dispatch(success(response, []));
            dispatch(navigate('event'));
          }
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
