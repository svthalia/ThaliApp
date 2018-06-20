import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import Snackbar from 'react-native-snackbar';
import { AsyncStorage } from 'react-native';

import loginSaga, { DISPLAYNAMEKEY, PHOTOKEY, TOKENKEY, USERNAMEKEY } from '../../app/sagas/login';
import { apiRequest } from '../../app/utils/url';
import * as loginActions from '../../app/actions/login';
import * as pushNotificationsActions from '../../app/actions/pushNotifications';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
  show: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock('react-native', () => ({
  AsyncStorage: {
    multiSet: jest.fn(),
    multiRemove: jest.fn(),
  },
}));

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
  tokenSelector: () => 'token',
}));

describe('login saga', () => {
  const error = new Error('error');

  describe('logging in', () => {
    it('should show a snackbar on start', () => expectSaga(loginSaga)
      .dispatch(loginActions.login('username', 'password'))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Logging in', duration: Snackbar.LENGTH_INDEFINITE });
      }));

    it('should put the result data when the request succeeds', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
      ])
      .put(loginActions.success('username', 'abc123'))
      .put(loginActions.profile('abc123'))
      .dispatch(loginActions.login('username', 'password'))
      .silentRun());

    it('should show a snackbar when the request succeeds', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
      ])
      .dispatch(loginActions.login('username', 'password'))
      .silentRun()
      .then(() => {
        expect(Snackbar.dismiss).toBeCalled();
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Login successful' });
      }));

    it('should save the token in the AsyncStorage when the request succeeds', () =>
      expectSaga(loginSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
      ])
      .dispatch(loginActions.login('username', 'password'))
      .silentRun()
      .then(() => {
        expect(AsyncStorage.multiSet).toBeCalledWith([
          [USERNAMEKEY, 'username'],
          [TOKENKEY, 'abc123'],
        ]);
      }));

    it('should show a snackbar when the request fails', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(loginActions.login('username', 'password'))
      .silentRun()
      .then(() => {
        expect(Snackbar.dismiss).toBeCalled();
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Login failed' });
      }));

    it('should do a POST request', () => expectSaga(loginSaga)
      .dispatch(loginActions.login('username', 'password'))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('token-auth', {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: '{"username":"username","password":"password"}',
        });
      }));
  });

  describe('logging out', () => {
    it('should remove the token from the AsyncStorage', () => expectSaga(loginSaga)
      .dispatch(loginActions.logout())
      .silentRun()
      .then(() => {
        expect(AsyncStorage.multiRemove).toBeCalledWith([USERNAMEKEY, TOKENKEY]);
      }));

    it('should put a push notification invalidation action', () => expectSaga(loginSaga)
      .put(pushNotificationsActions.invalidate())
      .dispatch(loginActions.logout())
      .silentRun());

    it('should remove the token from the AsyncStorage', () => expectSaga(loginSaga)
      .dispatch(loginActions.logout())
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Logout successful' });
      }));
  });

  describe('getting profile', () => {
    it('should put the result data when the request succeeds', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['members/me'] }), {
          display_name: 'Johnny Test',
          avatar: {
            medium: 'http://example.org/photo.png',
          },
        }],
      ])
      .put(loginActions.profileSuccess('Johnny Test', 'http://example.org/photo.png'))
      .dispatch(loginActions.profile('abc123'))
      .silentRun());

    it('should save the token in the AsyncStorage when the request succeeds', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['members/me'] }), {
          display_name: 'Johnny Test',
          avatar: {
            medium: 'http://example.org/photo.png',
          },
        }],
      ])
      .dispatch(loginActions.profile('abc123'))
      .silentRun()
      .then(() => {
        expect(AsyncStorage.multiSet).toBeCalledWith([
          [DISPLAYNAMEKEY, 'Johnny Test'],
          [PHOTOKEY, 'http://example.org/photo.png'],
        ]);
      }));

    it('should not care about errors', () => expectSaga(loginSaga)
      .provide([
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(loginActions.profile('token'))
      .silentRun());

    it('should do a GET request', () => expectSaga(loginSaga)
      .dispatch(loginActions.profile('abc123'))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('members/me', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token abc123',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
      }));
  });
});
