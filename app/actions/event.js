export const EVENT = 'EVENT_EVENT';
export const OPEN = 'EVENT_OPEN';
export const FETCHING = 'EVENT_FETCHING';
export const SUCCESS = 'EVENT_SUCCESS';
export const DONE = 'EVENT_DONE';
export const FAILURE = 'EVENT_FAILURE';
export const ADMIN = 'EVENT_ADMIN';
export const UPDATE_REGISTRATION = 'EVENT_UPDATE_REGISTRATION';

export function event(pk, navigateToEventScreen = true) {
  return {
    type: EVENT,
    payload: { pk, navigateToEventScreen },
  };
}

export function open() {
  return {
    type: OPEN,
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

export function admin() {
  return {
    type: ADMIN,
  };
}

export function updateRegistration(pk, present, payment) {
  return {
    type: UPDATE_REGISTRATION,
    payload: { pk, present, payment },
  };
}
