export const EVENT = 'EVENT_EVENT';
export const FETCHING = 'EVENT_FETCHING';
export const SUCCESS = 'EVENT_SUCCESS';
export const FAILURE = 'EVENT_FAILURE';

export function event(pk, token) {
  return {
    type: EVENT,
    payload: { pk, token },
  };
}

export function success(eventData, eventRegistrations) {
  return {
    type: SUCCESS,
    payload: { eventData, eventRegistrations },
  };
}

export function fetching() {
  return {
    type: FETCHING,
  };
}

export function failure() {
  return {
    type: FAILURE,
  };
}
