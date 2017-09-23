export const WELCOME = 'WELCOME_WELCOME';
export const SUCCESS = 'WELCOME_SUCCESS';
export const FAILURE = 'WELCOME_FAILURE';

export function welcome(amount, token) {
  return {
    type: WELCOME,
    payload: { amount, token },
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
