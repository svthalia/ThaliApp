export const REGISTER = 'PUSH_NOTIFICATIONS_REGISTER';
export const INVALIDATE = 'PUSH_NOTIFICATIONS_INVALIDATE';

export function register() {
  return { type: REGISTER };
}

export function invalidate() {
  return { type: INVALIDATE };
}
