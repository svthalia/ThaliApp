import * as types from './actionTypes';
import { url } from '../url';

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

export function retrieveCalendar(token) {
  return (dispatch) => {
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
    return fetch(`${url}/api/events/eventlist/?start=${start}&end=${end}`, data)
      .then(
        response => response.json())
      .then(
        responseJson => dispatch(calendarRetrieved(responseJson)))
      .catch(() => {
        dispatch(calendarNotRetrieved());
      });
  };
}
