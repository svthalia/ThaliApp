import * as types from '../actions/actionTypes';

const initialState = {
  eventList: [],
};

export default function welcome(state = initialState, action = {}) {
  switch (action.type) {
    case types.WELCOME:
      return {
        eventList: action.eventList,
      };
    default:
      return state;
  }
}
