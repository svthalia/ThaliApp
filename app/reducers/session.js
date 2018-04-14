import { defaultProfileImage } from '../utils/url';

import * as loginActions from '../actions/login';

const initialState = {
  token: '',
  username: '',
  displayName: '',
  photo: defaultProfileImage,
};

export default function session(state = initialState, action = {}) {
  switch (action.type) {
    case loginActions.SUCCESS:
      return {
        ...state,
        username: action.payload.username,
        token: action.payload.token,
      };
    case loginActions.PROFILE_SUCCESS:
      return {
        ...state,
        displayName: action.payload.displayName,
        photo: action.payload.photo,
      };
    case loginActions.TOKEN_INVALID:
    case loginActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
