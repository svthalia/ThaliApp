import * as calendarActions from '../actions/calendar';

const initialState = {
  eventList: [],
  loading: true,
  success: true,
  hasLoaded: false,
};

export default function calendar(state = initialState, action = {}) {
  switch (action.type) {
    case calendarActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        loading: false,
        success: true,
        hasLoaded: true,
      };
    case calendarActions.FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        hasLoaded: true,
      };
    case calendarActions.REFRESH:
      return { ...state, loading: true };
    default:
      return { ...state };
  }
}
