import * as calendarActions from '../actions/calendar';

const initialState = {
  eventList: [],
  loading: true,
  status: 'initial',
  keywords: '',
};

export default function calendar(state = initialState, action = {}) {
  switch (action.type) {
    case calendarActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        loading: false,
        status: 'success',
      };
    case calendarActions.FAILURE:
      return {
        ...state,
        loading: false,
        status: 'failure',
      };
    case calendarActions.REFRESH:
      return {
        ...state,
        loading: true,
        keywords: action.payload.keywords,
      };
    default:
      return state;
  }
}
