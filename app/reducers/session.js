import { DEFAULT_PROFILE_PHOTO } from '../constants';

import * as sessionActions from '../actions/session';

export const STATUS_SIGNED_OUT = 'SIGNED_OUT';
export const STATUS_SIGNED_IN = 'SIGNED_IN';
export const STATUS_SIGNING_IN = 'SIGNING_IN';

const initialState = {
  status: STATUS_SIGNED_OUT,
  token: '',
  displayName: '',
  pk: -1,
  photo: DEFAULT_PROFILE_PHOTO,
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
        ...action.payload,
      };
    case sessionActions.SET_USER_INFO:
      return {
        ...state,
        pk: action.payload.pk,
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
