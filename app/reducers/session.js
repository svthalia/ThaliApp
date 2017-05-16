import * as types from '../actions/actionTypes';

const initialState = {
  loginState: '',
  token: '',
  username: '',
  displayName: '',
  photo: '',
};

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGINSUCCESS:
      return {
        ...state,
        loginState: 'success',
        username: action.username,
        token: action.token,
        displayName: action.displayName,
        photo: action.photo,
      };
    case types.LOGINFAILURE:
      return { ...state, loginState: 'failure' };
    case types.LOGINPROGRESS:
      return { ...state, loginState: 'progress' };
    case types.LOGOUT:
      return { ...state, loginState: 'logout' };
    default:
      return state;
  }
}
