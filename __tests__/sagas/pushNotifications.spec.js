import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { Platform } from 'react-native';
import pushNotificationsSaga from '../../app/sagas/pushNotifications';
import { apiRequest } from '../../app/utils/url';
import * as pushActions from '../../app/actions/pushNotifications';
import { tokenSelector } from '../../app/selectors/session';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(),
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

    it('should do nothing without a token', () => expectSaga(pushNotificationsSaga)
      .provide([
        [select(tokenSelector), undefined],
      ])
      .dispatch(pushActions.register())
      .silentRun()
      .then(({ effects }) => {
        expect(effects.call).toBeUndefined();
        expect(effects.put).toBeUndefined();
      }));

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

    it('should post the correct categories to the server', () => expectSaga(pushNotificationsSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(pushActions.register(['general', 'events']))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('devices',
          {
            body: '{"type":"ios","receive_category":["general","events"]}',
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
