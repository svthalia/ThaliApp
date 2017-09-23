import * as types from '../actions/event';

const initialState = {
  data: {
    pk: -1,
    title: '',
    description: '',
    start: '',
    end: '',
    organiser: -1,
    category: '',
    location: '',
    status: -1,
    registered: false,
  },
  registrations: [],
  success: false,
  hasLoaded: false,
};

export default function loadEvent(state = initialState, action = {}) {
  switch (action.type) {
    case types.FETCHING: {
      return {
        ...state,
        hasLoaded: false,
      };
    }
    case types.SUCCESS:
      return {
        ...state,
        data: action.payload.eventData,
        registrations: action.payload.eventRegistrations,
        success: true,
        hasLoaded: true,
      };
    case types.FAILURE:
      return {
        ...state,
        success: false,
        hasLoaded: true,
      };
    default:
      return state;
  }
}
