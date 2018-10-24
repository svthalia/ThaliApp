export const PROFILE = 'PROFILE_PROFILE';
export const FETCHING = 'PROFILE_FETCHING';
export const SUCCESS = 'PROFILE_SUCCESS';
export const FAILURE = 'PROFILE_FAILURE';
export const UPDATING = 'PROFILE_UPDATING';
export const UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const UPDATE_FAIL = 'PROFILE_UPDATE_FAIL';

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

export function updating() {
  return {
    type: UPDATING,
  };
}

export function updateSuccess(profileData) {
  return {
    type: UPDATE_SUCCESS,
    payload: { profileData },
  };
}

export function updateFail() {
  return {
    type: UPDATE_FAIL,
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
