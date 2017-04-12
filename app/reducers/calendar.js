import * as types from '../actions/actionTypes';

const initialState = {
  eventList:'',
  calendarFetched: false,
};

export default function calendar(state = initialState, action = {}) {
  switch (action.type) {
    case types.CALENDARRETREIVED:
      return{...state, eventList:action.eventList, calendarFetched:true};
    case types.CALENDARERROR:
      return{...state, calendarFetched:true};
    default:
      return { ...state };
  }
}
