import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import AsyncStorage from '@react-native-community/async-storage';
import * as Sentry from '@sentry/react-native';
import { STORAGE_PUSH_CATEGORIES } from '../../app/constants';

import settingsSaga from '../../app/sagas/settings';
import {
  notificationsSettingsActions,
  settingsActions,
} from '../../app/actions/settings';
import * as pushNotificationActions from '../../app/actions/pushNotifications';
import { getRequest } from '../../app/sagas/utils/api';

jest.mock('@sentry/react-native', () => ({
  captureException: jest.fn(),
}));

describe('settings saga', () => {
  const error = new Error('error');

  describe('initialization', () => {
    describe('push notifications', () => {
      it('should load the categories from the website and the local storage', () =>
        expectSaga(settingsSaga)
          .dispatch(settingsActions.initStart())
          .call(getRequest, 'devices/categories')
          .call([AsyncStorage, 'getItem'], STORAGE_PUSH_CATEGORIES)
          .silentRun());

      it('should enable all categories initially if nothing found locally', () =>
        expectSaga(settingsSaga)
          .dispatch(settingsActions.initStart())
          .provide([
            [matchers.call.fn(getRequest), [{ key: 'cat1' }, { key: 'cat2' }]],
            [matchers.call.fn(AsyncStorage.getItem), null],
          ])
          .put(
            notificationsSettingsActions.success([
              { key: 'cat1', enabled: true },
              { key: 'cat2', enabled: true },
            ])
          )
          .put(settingsActions.initComplete())
          .silentRun());

      it('should enable only the categories in local storage', () =>
        expectSaga(settingsSaga)
          .dispatch(settingsActions.initStart())
          .provide([
            [matchers.call.fn(getRequest), [{ key: 'cat1' }, { key: 'cat2' }]],
            [matchers.call.fn(AsyncStorage.getItem), JSON.stringify(['cat1'])],
          ])
          .put(
            notificationsSettingsActions.success([
              { key: 'cat1', enabled: true },
              { key: 'cat2', enabled: false },
            ])
          )
          .put(settingsActions.initComplete())
          .silentRun());

      it('should fail upon error', () =>
        expectSaga(settingsSaga)
          .dispatch(settingsActions.initStart())
          .provide([
            [matchers.call.fn(getRequest), throwError(error)],
            [matchers.call.fn(AsyncStorage.getItem), null],
          ])
          .put(notificationsSettingsActions.failure())
          .put(settingsActions.initComplete())
          .silentRun()
          .then(() => {
            expect(Sentry.captureException).toBeCalled();
          }));
    });
  });

  describe('push notifications', () => {
    it('should store new preferences in local storage', () =>
      expectSaga(settingsSaga)
        .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
        .call(
          [AsyncStorage, 'setItem'],
          STORAGE_PUSH_CATEGORIES,
          JSON.stringify(['cat1'])
        )
        .silentRun());

    it('should call the action to update preferences remotely', () =>
      expectSaga(settingsSaga)
        .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
        .put(pushNotificationActions.register(['cat1']))
        .silentRun());

    it('should capture any exception', () =>
      expectSaga(settingsSaga)
        .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
        .provide([[matchers.call.fn(AsyncStorage.setItem), throwError(error)]])
        .silentRun()
        .then(() => {
          expect(Sentry.captureException).toBeCalled();
        }));
  });
});
