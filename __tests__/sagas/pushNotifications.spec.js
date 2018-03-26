import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { Platform } from 'react-native';
import FCM from 'react-native-fcm';
import pushNotificationsSaga from '../../app/sagas/pushNotifications';
import { apiRequest, tokenSelector } from '../../app/utils/url';
import * as pushActions from '../../app/actions/pushNotifications';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(),
  tokenSelector: () => 'token',
}));

jest.mock('react-native-fcm', () => ({
  getFCMToken: jest.fn(),
  requestPermissions: jest.fn(),
  deleteInstanceId: jest.fn(),
}));

describe('pushNotifications saga', () => {
  beforeAll(() => {
    FCM.getFCMToken.mockReturnValue('token');
  });

  describe('register', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
      FCM.requestPermissions.mockReset();
      FCM.getFCMToken.mockReset();
      apiRequest.mockReset();
    });

    it('should request permissions when platform is iOS', () => expectSaga(pushNotificationsSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(pushActions.register())
      .silentRun()
      .then(() => {
        expect(FCM.requestPermissions).toBeCalled();
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
          expect(FCM.requestPermissions).not.toBeCalled();
        });
    });

    it('should post a token to the server', () => {
      return expectSaga(pushNotificationsSaga)
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
        });
    });
  });

  describe('invalidate', () => {
    it('should delete the instance id', () => expectSaga(pushNotificationsSaga)
      .dispatch(pushActions.invalidate())
      .silentRun()
      .then(() => {
        expect(FCM.deleteInstanceId).toBeCalled();
      }));
  });
});
