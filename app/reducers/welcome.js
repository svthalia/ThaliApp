import * as welcomeActions from '../actions/welcome';

const initialState = {
  eventList: [],
  loading: true,
  status: 'initial',
};

export default function welcome(state = initialState, action = {}) {
  switch (action.type) {
    case welcomeActions.SUCCESS:
      return {
        eventList: action.payload.eventList,
        loading: false,
        status: 'success',
      };
    case welcomeActions.FAILURE:
      return {
        ...state,
        loading: false,
        status: 'failure',
      };
    case welcomeActions.REFRESH:
      return { ...state, loading: true };
    default:
      return state;
  }
}
