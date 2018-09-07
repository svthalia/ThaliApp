import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import Snackbar from 'react-native-snackbar';
import { AsyncStorage } from 'react-native';
import { Sentry } from 'react-native-sentry';

import sessionSaga, {
  DISPLAYNAMEKEY, PHOTOKEY, TOKENKEY, USERNAMEKEY,
} from '../../app/sagas/session';
import { apiRequest } from '../../app/utils/url';
import * as sessionActions from '../../app/actions/session';
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
    clear: jest.fn(),
  },
}));

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'abc123',
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

jest.mock('react-native-sentry', () => ({
  Sentry: {
    setUserContext: () => {},
    captureException: () => {},
  },
}));

describe('session saga', () => {
  const error = new Error('error');

  describe('logging in', () => {
    it('should put the result data when the request succeeds', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
        [matchers.call.like({ fn: Sentry.setUserContext }), {}],
      ])
      .put(sessionActions.signedIn('username', 'abc123'))
      .put(sessionActions.fetchUserInfo())
      .dispatch(sessionActions.signIn('username', 'password'))
      .silentRun());

    it('should show a snackbar when the request succeeds', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
        [matchers.call.like({ fn: Sentry.setUserContext }), {}],
      ])
      .dispatch(sessionActions.signIn('username', 'password'))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Login successful' },
        );
      }));

    it('should save the token in the AsyncStorage when the request succeeds', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['token-auth'] }), { token: 'abc123' }],
        [matchers.call.like({ fn: Sentry.setUserContext }), {}],
      ])
      .dispatch(sessionActions.signIn('username', 'password'))
      .silentRun()
      .then(() => {
        expect(AsyncStorage.multiSet).toBeCalledWith([
          [USERNAMEKEY, 'username'],
          [TOKENKEY, 'abc123'],
        ]);
      }));

    it('should put token invalid when the request fails', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .put(sessionActions.tokenInvalid())
      .dispatch(sessionActions.signIn('username', 'password'))
      .silentRun());

    it('should show a snackbar when the request fails', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(sessionActions.signIn('username', 'password'))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Login failed' },
        );
      }));

    it('should do a POST request', () => expectSaga(sessionSaga)
      .dispatch(sessionActions.signIn('username', 'password'))
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
    it('should remove the token from the AsyncStorage', () => expectSaga(sessionSaga)
      .dispatch(sessionActions.signOut())
      .silentRun()
      .then(() => {
        expect(AsyncStorage.clear).toBeCalled();
      }));

    it('should put a push notification invalidation action', () => expectSaga(sessionSaga)
      .put(pushNotificationsActions.invalidate())
      .dispatch(sessionActions.signOut())
      .silentRun());

    it('should remove the token from the AsyncStorage', () => expectSaga(sessionSaga)
      .dispatch(sessionActions.signOut())
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Logout successful' },
        );
      }));
  });

  describe('getting profile', () => {
    it('should put the result data when the request succeeds', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['members/me'] }), {
          display_name: 'Johnny Test',
          avatar: {
            medium: 'http://example.org/photo.png',
          },
        }],
      ])
      .put(sessionActions.setUserInfo('Johnny Test', 'http://example.org/photo.png'))
      .dispatch(sessionActions.fetchUserInfo())
      .silentRun());

    it('should save the token in the AsyncStorage when the request succeeds', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.like({ fn: apiRequest, args: ['members/me'] }), {
          display_name: 'Johnny Test',
          avatar: {
            medium: 'http://example.org/photo.png',
          },
        }],
      ])
      .dispatch(sessionActions.fetchUserInfo())
      .silentRun()
      .then(() => {
        expect(AsyncStorage.multiSet).toBeCalledWith([
          [DISPLAYNAMEKEY, 'Johnny Test'],
          [PHOTOKEY, 'http://example.org/photo.png'],
        ]);
      }));

    it('should not care about errors', () => expectSaga(sessionSaga)
      .provide([
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(sessionActions.fetchUserInfo())
      .silentRun());

    it('should do a GET request', () => expectSaga(sessionSaga)
      .dispatch(sessionActions.fetchUserInfo())
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
