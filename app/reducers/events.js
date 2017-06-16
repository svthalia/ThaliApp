import * as types from '../actions/actionTypes';

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
    case types.LOADEVENTSTART: {
      return {
        ...state,
        hasLoaded: false,
      };
    }
    case types.LOADEVENTSUCCESS:
      return {
        ...state,
        data: action.data,
        registrations: action.registrations,
        success: true,
        hasLoaded: true,
      };
    case types.LOADEVENTFAILURE:
      return {
        ...state,
        success: false,
        hasLoaded: true,
      };
    default:
      return state;
  }
}
