import * as welcomeActions from '../actions/welcome';

const initialState = {
  eventList: [],
  loading: true,
  success: true,
  hasLoaded: false,
};

export default function welcome(state = initialState, action = {}) {
  switch (action.type) {
    case welcomeActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        loading: false,
        success: true,
        hasLoaded: true,
      };
    case welcomeActions.FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        hasLoaded: true,
      };
    case welcomeActions.REFRESH:
      return { ...state, loading: true };
    default:
      return state;
  }
}
