import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';
import { navigate } from './navigation';

const TOKENKEY = '@MyStore:token';

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

export function loadEvent(id) {
  return (dispatch) => {
    AsyncStorage.getItem(TOKENKEY)
      .then(
        (token) => {
          const data = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          };
          return fetch(`http://localhost:8000/api/events/data/?event_id=${id}`, data)
            .then(
              response => response.json(),
            )
            .then(
              (response) => {
                dispatch(success(response));
              },
            )
            .catch(
              () => {
                dispatch(fail());
              },
            );
        },
      )
      .catch(
        () => {
          dispatch(fail());
        },
      );
    dispatch(navigate('event'));
  };
}
