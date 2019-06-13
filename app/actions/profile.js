export const PROFILE = 'PROFILE_PROFILE';
export const FETCHING = 'PROFILE_FETCHING';
export const SUCCESS = 'PROFILE_SUCCESS';
export const FAILURE = 'PROFILE_FAILURE';
export const UPDATE = 'PROFILE_UPDATE';
export const UPDATE_SUCCESS = 'PROFILE_UPDATE_SUCCESS';
export const CHANGE_AVATAR = 'PROFILE_CHANGE_AVATAR';

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

export function changeAvatar() {
  return {
    type: CHANGE_AVATAR,
  };
}

export function updateSuccess(profileData) {
  return {
    type: UPDATE_SUCCESS,
    payload: profileData,
  };
}

export function success(profileData) {
  return {
    type: SUCCESS,
    payload: profileData,
  };
}

export function failure() {
  return {
    type: FAILURE,
  };
}
