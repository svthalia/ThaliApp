export const OPEN = 'CALENDAR_OPEN';
export const REFRESH = 'CALENDAR_REFRESH';
export const SUCCESS = 'CALENDAR_SUCCESS';
export const FAILURE = 'CALENDAR_FAILURE';
export const FETCHING = 'CALENDAR_FETCHING';

export function open() {
  return {
    type: OPEN,
  };
}

export function refresh(keywords) {
  return {
    type: REFRESH,
    payload: { keywords },
  };
}

export function success(eventList) {
  return {
    type: SUCCESS,
    payload: { eventList },
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
