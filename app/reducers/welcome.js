import * as types from '../actions/actionTypes';

const initialState = {
  eventList: [],
  hasLoaded: false,
};

export default function welcome(state = initialState, action = {}) {
  switch (action.type) {
    case types.WELCOME:
      return {
        eventList: action.eventList,
        hasLoaded: true,
      };
    default:
      return state;
  }
}
