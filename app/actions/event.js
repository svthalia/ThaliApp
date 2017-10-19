export const EVENT = 'EVENT_EVENT';
export const FETCHING = 'EVENT_FETCHING';
export const SUCCESS = 'EVENT_SUCCESS';
export const DONE = 'EVENT_DONE';
export const FAILURE = 'EVENT_FAILURE';

export function event(pk) {
  return {
    type: EVENT,
    payload: { pk },
  };
}

export function success(eventData, eventRegistrations) {
  return {
    type: SUCCESS,
    payload: { eventData, eventRegistrations },
  };
}

export function done() {
  return {
    type: DONE,
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
