import { select } from 'redux-saga/effects';
import { Platform } from 'react-native';
import { expectSaga } from 'redux-saga-test-plan';
import * as pushActions from '../../app/actions/pushNotifications';
import pushNotificationsSaga from '../../app/sagas/pushNotifications';
import { postRequest } from '../../app/sagas/utils/api';
import { accessTokenSelector } from '../../app/selectors/session';

const mockIid = {
  delete: jest.fn(),
};

const mockMessaging = {
  hasPermission: jest.fn(),
  getToken: jest.fn(() => 'pushToken'),
  requestPermission: jest.fn(),
};

jest.mock('@react-native-firebase/messaging', () => () => mockMessaging);
jest.mock('@react-native-firebase/iid', () => () => mockIid);

describe('pushNotifications saga', () => {
  describe('register', () => {
    beforeEach(() => {
      Platform.OS = 'ios';
      mockMessaging.requestPermission.mockReset();
    });

    it('should do nothing without a token', () =>
      expectSaga(pushNotificationsSaga)
        .provide([[select(accessTokenSelector), undefined]])
        .dispatch(pushActions.register())
        .not.call([mockMessaging, 'hasPermission'])
        .silentRun());

    it('should request permissions when platform is iOS', () =>
      expectSaga(pushNotificationsSaga)
        .provide([[select(accessTokenSelector), 'token']])
        .dispatch(pushActions.register())
        .silentRun()
        .then(() => {
          expect(mockMessaging.requestPermission).toBeCalled();
        }));

    it('should not request permissions when platform is Android', () => {
      Platform.OS = 'android';
      return expectSaga(pushNotificationsSaga)
        .provide([[select(accessTokenSelector), 'token']])
        .dispatch(pushActions.register())
        .not.call(mockMessaging.requestPermission)
        .silentRun();
    });

    it('should post a token to the server', () =>
      expectSaga(pushNotificationsSaga)
        .provide([[select(accessTokenSelector), 'token']])
        .dispatch(pushActions.register())
        .call(postRequest, 'devices', {
          registration_id: 'pushToken',
          type: 'ios',
        })
        .silentRun());

    it('should post the correct categories to the server', () =>
      expectSaga(pushNotificationsSaga)
        .provide([[select(accessTokenSelector), 'token']])
        .dispatch(pushActions.register(['general', 'events']))
        .call(postRequest, 'devices', {
          registration_id: 'pushToken',
          type: 'ios',
          receive_category: ['general', 'events'],
        })
        .silentRun());
  });

  describe('invalidate', () => {
    it('should delete the instance id', () =>
      expectSaga(pushNotificationsSaga)
        .dispatch(pushActions.invalidate())
        .silentRun()
        .then(() => {
          expect(mockIid.delete).toBeCalled();
        }));
  });
});
