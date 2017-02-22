import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  loginError: false,
  loginProgress: false,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGINSUCCESS:
      return { ...state, loginProgress: false, loginError: false, loggedIn: true };
      break;
    case types.LOGINFAILURE:
      return { ...state, loginProgress: false, loginError: true, loggedIn: false };
    case types.LOGINPROGRESS:
      return { ...state, loginProgress: true, logginError: false, loggedIn: false };
    default:
      return { ...state };
  }
}
