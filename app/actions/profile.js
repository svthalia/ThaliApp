export const PROFILE = 'PROFILE_PROFILE';
export const FETCHING = 'PROFILE_FETCHING';
export const SUCCESS = 'PROFILE_SUCCESS';
export const FAILURE = 'PROFILE_FAILURE';

export function profile(member = 'me') {
  return {
    type: PROFILE,
    payload: { member },
  };
}

export function fetching() {
  return {
    type: FETCHING,
  };
}

export function success(profileData) {
  return {
    type: SUCCESS,
    payload: { profileData },
  };
}

export function failure() {
  return {
    type: FAILURE,
  };
}
