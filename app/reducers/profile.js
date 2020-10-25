import * as profileActions from '../actions/profile';

import { DEFAULT_PROFILE_PHOTO } from '../constants';

const initialState = {
  profile: {
    pk: -1,
    display_name: '',
    avatar: {
      full: DEFAULT_PROFILE_PHOTO,
      large: DEFAULT_PROFILE_PHOTO,
      medium: DEFAULT_PROFILE_PHOTO,
      small: DEFAULT_PROFILE_PHOTO,
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
};

export default function profile(state = initialState, { type, payload } = {}) {
  switch (type) {
    case profileActions.FETCHING:
      return {
        ...state,
        hasLoaded: false,
      };
    case profileActions.SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
        success: true,
        hasLoaded: true,
      };
    case profileActions.FAILURE:
      return {
        ...state,
        success: false,
        hasLoaded: true,
      };
    case profileActions.UPDATE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
      };
    default:
      return state;
  }
}
