import { defaultProfileImage } from '../utils/url';

import * as sessionActions from '../actions/session';

const initialState = {
  token: '',
  username: '',
  displayName: '',
  photo: defaultProfileImage,
};

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case sessionActions.SIGNED_IN:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };
    case sessionActions.SET_USER_INFO:
      return {
        ...state,
        displayName: action.payload.displayName,
        photo: action.payload.photo,
      };
    case sessionActions.TOKEN_INVALID:
    case sessionActions.SIGN_OUT:
      return initialState;
    default:
      return state;
  }
}
