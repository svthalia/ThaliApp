import * as welcomeActions from '../actions/welcome';

const initialState = {
  eventList: [],
  hasLoaded: false,
};

export default function welcome(state = initialState, action = {}) {
  switch (action.type) {
    case welcomeActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        hasLoaded: true,
      };
    default:
      return state;
  }
}
