export const MEMBERS = 'MEMBERS_MEMBERS';
export const FETCHING = 'MEMBERS_FETCHING';
export const MEMBERS_SUCCESS = 'MEMBERS_MEMBERS_SUCCESS';
export const FAILURE = 'MEMBERS_FAILURE';
export const MORE = 'MEMBERS_MORE';
export const MORE_SUCCESS = 'MEMBERS_MORE_SUCCESS';

export function members(keywords = null) {
  return {
    type: MEMBERS,
    payload: { keywords },
  };
}

export function fetching() {
  return {
    type: FETCHING,
  };
}

export function success(memberList, next, searchKey) {
  return {
    type: MEMBERS_SUCCESS,
    payload: { memberList, next, searchKey },
  };
}

export function failure() {
  return {
    type: FAILURE,
  };
}

export function more(url) {
  return {
    type: MORE,
    payload: { url },
  };
}

export function moreSuccess(memberList, next) {
  return {
    type: MORE_SUCCESS,
    payload: { memberList, next },
  };
}
