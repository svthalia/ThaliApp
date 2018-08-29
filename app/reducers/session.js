import { defaultProfileImage } from '../utils/url';

import * as sessionActions from '../actions/session';

export const STATUS_SIGNED_OUT = 'SIGNED_OUT';
export const STATUS_SIGNED_IN = 'SIGNED_IN';
export const STATUS_SIGNING_IN = 'SIGNING_IN';

const initialState = {
  status: STATUS_SIGNED_OUT,
  token: '',
  username: '',
  displayName: '',
  photo: defaultProfileImage,
};

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case sessionActions.SIGN_IN:
      return {
        ...state,
        status: STATUS_SIGNING_IN,
      };
    case sessionActions.SIGNED_IN:
      return {
        ...state,
        status: STATUS_SIGNED_IN,
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
