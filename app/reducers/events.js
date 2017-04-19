import * as types from '../actions/actionTypes';

const initialState = {
  data: {
    title: '',
    description: '',
    start: '',
    end: '',
    organiser: '',
    location: '',
    price: '',
    fine: '',
  },
  success: false,
};

export default function loadEvent(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADEVENTSUCCESS:
      return {
        data: action.data,
        success: true,
      };
    case types.LOADEVENTFAILURE:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
}
