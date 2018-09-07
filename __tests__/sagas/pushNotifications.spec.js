import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { Platform } from 'react-native';
import pushNotificationsSaga from '../../app/sagas/pushNotifications';
import { apiRequest } from '../../app/utils/url';
import * as pushActions from '../../app/actions/pushNotifications';
import { tokenSelector } from '../../app/selectors/session';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'token',
}));

const mockIid = {
  delete: jest.fn(),
};

const mockMessaging = {
  hasPermission: jest.fn(),
  getToken: jest.fn(),
  requestPermission: jest.fn(),
};

jest.mock('react-native-firebase', () => ({
  iid: () => mockIid,
  messaging: () => mockMessaging,
}));

describe('pushNotifications saga', () => {
  beforeAll(() => {
    mockMessaging.getToken.mockReturnValue('token');
  });

  describe('register', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
      mockMessaging.requestPermission.mockReset();
      mockMessaging.getToken.mockReset();
      apiRequest.mockReset();
    });

    it('should request permissions when platform is iOS', () => expectSaga(pushNotificationsSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(pushActions.register())
      .silentRun()
      .then(() => {
        expect(mockMessaging.requestPermission).toBeCalled();
      }));

    it('should not request permissions when platform is Android', () => {
      Platform.OS = 'android';
      return expectSaga(pushNotificationsSaga)
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .dispatch(pushActions.register())
        .silentRun()
        .then(() => {
          expect(mockMessaging.requestPermission).not.toBeCalled();
        });
    });

    it('should post a token to the server', () => expectSaga(pushNotificationsSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['events'] }), { results: 'data' }],
      ])
      .dispatch(pushActions.register())
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('devices',
          {
            body: '{"type":"ios"}',
            headers: {
              Accept: 'application/json',
              Authorization: 'Token token',
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
      }));
  });

  describe('invalidate', () => {
    it('should delete the instance id', () => expectSaga(pushNotificationsSaga)
      .dispatch(pushActions.invalidate())
      .silentRun()
      .then(() => {
        expect(mockIid.delete).toBeCalled();
      }));
  });
});
