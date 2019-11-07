import * as calendarActions from '../actions/calendar';

const initialState = {
  eventList: [],
  loading: true,
  status: 'initial',
  keywords: undefined,
};

export default function calendar(state = initialState, { type, payload }) {
  switch (type) {
    case calendarActions.SUCCESS:
      return {
        eventList: payload.eventList,
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
        keywords: payload.keywords,
      };
    default:
      return state;
  }
}
