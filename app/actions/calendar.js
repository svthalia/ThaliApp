export const REFRESH = 'CALENDAR_REFRESH';
export const SUCCESS = 'CALENDAR_SUCCESS';
export const FAILURE = 'CALENDAR_FAILURE';

export function refresh() {
  return {
    type: REFRESH,
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
