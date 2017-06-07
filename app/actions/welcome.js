import { apiUrl } from '../url';
import * as types from './actionTypes';

export function welcome(eventList) {
  return {
    type: types.WELCOME,
    eventList,
  };
}

export function retrieveShortlist(token, amount) {
  return (dispatch) => {
    const data = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    };

    return fetch(`${apiUrl}/events/?limit=${amount}&ordering=start`, data)
      .then(
        response => response.json(),
      )
      .then(
        responseJson => dispatch(welcome(responseJson.results)),
      )
      .catch(
        () => dispatch(welcome([])),
      );
  };
}
