import * as loginActions from '../actions/login';

const initialState = {
  token: '',
  username: '',
  displayName: '',
  photo: '',
};

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case loginActions.SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
        displayName: action.payload.displayName,
        photo: action.payload.photo,
      };
    case loginActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
