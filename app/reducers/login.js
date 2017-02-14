import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  loginError: false,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      if (action.success) {
        return { ...state, loginError: false, loggedIn: true };
      }
      return { ...state, loginError: true };
    default:
      return { ...state };
  }
}
