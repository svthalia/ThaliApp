import * as types from '../actions/actionTypes';
import * as console from "react-native";

const initialState = {
  loginState: '',
  token: '',
  username: '',
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGINSUCCESS:
      return { ...state, loginState: 'success', username: action.username, token: action.token };
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
