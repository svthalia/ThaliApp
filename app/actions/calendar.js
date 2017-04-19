import { AsyncStorage } from 'react-native';
import * as types from './actionTypes';

const TOKENKEY = '@MyStore:token';

export function calendarRetrieved(eventList) {
  return {
    type: types.CALENDARRETREIVED,
    eventList,
  };
}

export function calendarNotRetrieved() {
  return {
    type: types.CALENDARERROR,
  };
}

export function retrieveCalendar() {
  return (dispatch) => {
    AsyncStorage.getItem(TOKENKEY)
      .then(
        (token) => {
          const start = new Date().toISOString().substring(0, 10);
          let end = new Date();
          end.setMonth(end.getMonth() + 6);
          end = end.toISOString().substring(0, 10);
          const data = {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Token ${token}`,
            },
          };
          return fetch(`http://localhost:8000/api/events/eventlist/?start=${start}&end=${end}`, data)
            .then(
              response => response.json())
            .then(
              responseJson => dispatch(calendarRetrieved(responseJson)))
            .catch(() => {
              dispatch(calendarNotRetrieved());
            });
        },
      );
  };
}
