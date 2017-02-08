import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  loginError: false,
  username: '',
  password: '',
};

export default function typing(state = initialState, action = {}) {
  switch (action.type) {
    case types.ENTER_USERNAME:
      return { ...state, username: action.username };
    case types.ENTER_PASSWORD:
      return { ...state, password: action.password };
    case types.LOGIN:
      if (state.password === '42') {
        return { ...state, loginError: false, loggedIn: true };
      }
      return { ...state, loginError: true };
    default:
      return state;
  }
}
