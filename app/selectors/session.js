import { STATUS_SIGNED_IN } from '../reducers/session';

export const tokenSelector = state => state.session.token;
export const loggedInSelector = state => state.session.status === STATUS_SIGNED_IN;
