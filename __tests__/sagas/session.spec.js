import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';

import {
  STORAGE_ACCESS_TOKEN,
  STORAGE_DISPLAY_NAME,
  STORAGE_PROFILE_PHOTO,
  STORAGE_PUSH_CATEGORIES,
  STORAGE_REFRESH_TOKEN,
  STORAGE_TOKEN_EXPIRATION,
  STORAGE_USER_ID,
} from '../../app/constants';
import sessionSaga from '../../app/sagas/session';
import * as sessionActions from '../../app/actions/session';
import * as pushNotificationsActions from '../../app/actions/pushNotifications';
import { getRequest } from '../../app/sagas/utils/api';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
  show: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'abc123',
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

jest.mock('@sentry/react-native', () => ({
  setContext: () => {},
  captureException: jest.fn(),
}));

describe('session saga', () => {
  const error = new Error('error');

  describe('logging out', () => {
    it('should remove the token from the AsyncStorage', () =>
      expectSaga(sessionSaga)
        .dispatch(sessionActions.signOut())
        .call(
          [AsyncStorage, 'multiRemove'],
          [
            STORAGE_USER_ID,
            STORAGE_ACCESS_TOKEN,
            STORAGE_REFRESH_TOKEN,
            STORAGE_TOKEN_EXPIRATION,
            STORAGE_DISPLAY_NAME,
            STORAGE_PROFILE_PHOTO,
            STORAGE_PUSH_CATEGORIES,
          ]
        )
        .silentRun());

    it('should put a push notification invalidation action', () =>
      expectSaga(sessionSaga)
        .put(pushNotificationsActions.invalidate())
        .dispatch(sessionActions.signOut())
        .silentRun());

    it('should show a snackbar', () =>
      expectSaga(sessionSaga)
        .dispatch(sessionActions.signOut())
        .call([Snackbar, 'show'], { text: 'Logout successful' })
        .silentRun());
  });

  describe('getting profile', () => {
    it('should put the result data when the request succeeds', () =>
      expectSaga(sessionSaga)
        .provide([
          [
            matchers.call.like({ fn: getRequest, args: ['members/me'] }),
            {
              pk: 12,
              display_name: 'Johnny Test',
              avatar: {
                medium: 'http://example.org/photo.png',
              },
            },
          ],
        ])
        .put(
          sessionActions.setUserInfo(12, 'Johnny Test', 'http://example.org/photo.png')
        )
        .dispatch(sessionActions.fetchUserInfo())
        .silentRun());

    it('should save the token in the AsyncStorage when the request succeeds', () =>
      expectSaga(sessionSaga)
        .provide([
          [
            matchers.call.like({ fn: getRequest, args: ['members/me'] }),
            {
              pk: 12,
              display_name: 'Johnny Test',
              avatar: {
                medium: 'http://example.org/photo.png',
              },
            },
          ],
        ])
        .dispatch(sessionActions.fetchUserInfo())
        .call(AsyncStorage.multiSet, [
          [STORAGE_USER_ID, '12'],
          [STORAGE_DISPLAY_NAME, 'Johnny Test'],
          [STORAGE_PROFILE_PHOTO, 'http://example.org/photo.png'],
        ])
        .silentRun());

    it('should log any errors', () =>
      expectSaga(sessionSaga)
        .provide([[matchers.call.fn(getRequest), throwError(error)]])
        .dispatch(sessionActions.fetchUserInfo())
        .silentRun()
        .then(() => {
          expect(Sentry.captureException).toBeCalled();
        }));

    it('should do a GET request', () =>
      expectSaga(sessionSaga)
        .dispatch(sessionActions.fetchUserInfo())
        .call(getRequest, 'members/me')
        .silentRun());
  });
});
