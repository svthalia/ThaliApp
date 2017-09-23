import * as loginActions from '../actions/login';

const initialState = {
  loginState: '',
  token: '',
  username: '',
  displayName: '',
  photo: '',
};

export default function session(state = initialState, action = {}) {
  console.log(state);
  switch (action.type) {
    case loginActions.SUCCESS:
      return {
        ...state,
        loginState: 'success',
        username: action.payload.username,
        token: action.payload.token,
        displayName: action.payload.displayName,
        photo: action.payload.photo,
      };
    case loginActions.FAILURE:
      return { ...state, loginState: 'failure' };
    case loginActions.FETCHING:
      return { ...state, loginState: 'progress' };
    case loginActions.LOGOUT:
      return { ...initialState, loginState: 'logout' };
    case loginActions.RESET:
      return { ...state, loginState: '' };
    default:
      return state;
  }
}
