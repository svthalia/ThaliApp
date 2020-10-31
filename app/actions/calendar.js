export const OPEN = 'CALENDAR_OPEN';
export const EVENTS = 'CALENDAR_EVENTS';
export const SUCCESS = 'CALENDAR_SUCCESS';
export const FAILURE = 'CALENDAR_FAILURE';
export const FETCHING = 'CALENDAR_FETCHING';

export function open() {
  return {
    type: OPEN,
  };
}

export function events(keywords = '') {
  return {
    type: EVENTS,
    payload: { keywords },
  };
}

export function success(eventList, keywords) {
  return {
    type: SUCCESS,
    payload: { eventList, keywords },
  };
}

export function failure() {
  return { type: FAILURE };
}

export function fetching() {
  return {
    type: FETCHING,
  };
}
