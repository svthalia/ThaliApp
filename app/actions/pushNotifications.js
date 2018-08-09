export const REGISTER = 'PUSH_NOTIFICATIONS_REGISTER';
export const INVALIDATE = 'PUSH_NOTIFICATIONS_INVALIDATE';

export function register(categories = null) {
  return { type: REGISTER, categories };
}

export function invalidate() {
  return { type: INVALIDATE };
}
