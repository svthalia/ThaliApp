import * as calendarActions from '../actions/calendar';

const initialState = {
  eventList: [],
  loading: true,
};

export default function calendar(state = initialState, action = {}) {
  switch (action.type) {
    case calendarActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        loading: false,
      };
    case calendarActions.FAILURE:
      return { ...state, loading: false };
    case calendarActions.REFRESH:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
}
