export const REFRESH = 'WELCOME_REFRESH';
export const SUCCESS = 'WELCOME_SUCCESS';
export const FAILURE = 'WELCOME_FAILURE';

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
