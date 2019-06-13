import * as profileActions from '../actions/profile';

import { defaultProfileImage } from '../utils/url';

const initialState = {
  profile: {
    pk: -1,
    display_name: '',
    avatar: {
      full: defaultProfileImage,
      large: defaultProfileImage,
      medium: defaultProfileImage,
      small: defaultProfileImage,
    },
    profile_description: '',
    birthday: '',
    starting_year: -1,
    programme: '',
    website: '',
    membership_type: '',
    achievements: [],
    societies: [],
  },
  success: false,
  hasLoaded: false,
  updating: false,
};

export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    case profileActions.FETCHING:
      return {
        ...state,
        hasLoaded: false,
      };
    case profileActions.SUCCESS:
      return {
        ...state,
        profile: action.payload.profileData,
        success: true,
        hasLoaded: true,
      };
    case profileActions.FAILURE:
      return {
        ...state,
        success: false,
        hasLoaded: true,
      };
    case profileActions.UPDATING:
      return {
        ...state,
        updating: true,
      };
    case profileActions.UPDATE_FAIL:
    case profileActions.UPDATE_SUCCESS:
      return {
        ...state,
        updating: false,
      };
    default:
      return state;
  }
}
