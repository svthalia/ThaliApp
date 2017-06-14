import * as types from '../actions/actionTypes';

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
};

export default function profile(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADPROFILESUCCESS:
      return {
        ...state,
        profile: action.profile,
        success: true,
      };
    case types.LOADPROFILEFAILURE:
      return {
        ...state,
        success: false,
      };
    default:
      return state;
  }
}
