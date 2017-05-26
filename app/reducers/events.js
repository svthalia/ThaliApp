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
};

export default function loadEvent(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADEVENTSUCCESS:
      return {
        ...state,
        data: action.data,
        success: true,
      };
    case types.LOADEVENTFAILURE:
      return {
        ...state,
        success: false,
      };
    case types.LOADEVENTREGISTRATIONSSUCCESS:
      return {
        ...state,
        registrations: action.data,
      };
    case types.LOADEVENTREGISTRATIONSFAILURE:
      return {
        ...state,
        registrations: action.data,
      };
    default:
      return state;
  }
}
