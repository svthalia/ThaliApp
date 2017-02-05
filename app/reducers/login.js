import * as types from '../actions/actionTypes';

const initialState = {
  loggedIn: false
};

export default function login(state = initialState, action = {}) {
  console.log(state);
  switch (action.type) {
    case types.LOGIN:
      console.log({...state, loggedIn: true});
      return {...state, loggedIn: true};
    default:
      return {...state};
  }
}
