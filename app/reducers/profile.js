import * as profileActions from '../actions/profile';

const initialState = {
  profile: {
    pk: -1,
    display_name: '',
    photo: '',
    profile_description: '',
    birthday: '',
    starting_year: -1,
    programme: '',
    website: '',
    membership_type: '',
    achievements: [],
  },
  success: false,
  hasLoaded: false,
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
    default:
      return state;
  }
}
