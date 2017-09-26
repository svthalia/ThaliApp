export const REGISTER = 'PUSH_NOTIFICATIONS_REGISTER';
export const INVALIDATE = 'PUSH_NOTIFICATIONS_INVALIDATE';

export function register(token) {
  return { type: REGISTER, payload: { token } };
}

export function invalidate() {
  return { type: INVALIDATE };
}
