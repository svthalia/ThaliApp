import * as types from './actionTypes';

export default function login(username, password) {
  return {
    type: types.LOGIN,
    success: password === '42',
  };
}
