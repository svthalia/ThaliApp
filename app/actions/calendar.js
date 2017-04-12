import * as types from './actionTypes';

export function calendarRetrieved(eventList) {
  return {
    type: types.CALENDARRETREIVED,
    eventList:eventList
  };
}

export function calendarNotRetrieved() {
  return {
    type: types.CALENDARERROR,
  };
}

export function retrieveCalendar(){
  return (dispatch)=> {
    let start = new Date().toISOString().substring(0, 10);
    let end = new Date();
    end.setMonth(end.getMonth() + 6);
    end = end.toISOString().substring(0, 10);
    return fetch('http://localhost:8000/api/events?start='+start+'&end='+end)
      .then(
        response => response.json())
      .then(
        (responseJson) => {
          console.log(responseJson);
          return dispatch(calendarRetrieved(responseJson));
        })
      .catch((error) => {
        console.log(error);
        dispatch(calendarNotRetrieved());
      })
      };
  }