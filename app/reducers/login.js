import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      return { ...state, loggedIn: true };
    default:
      return { ...state };
  }
}
