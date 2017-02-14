import * as types from '../actions/actionTypes';

const initialState = {
  currentScene: 'login',
};


export default function navigate(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN:
      if (action.success) {
        return { ...state, currentScene: 'welcome' };
      }
      return { ...state };
    default:
      return { ...state };
  }
}
