import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { Sentry } from 'react-native-sentry';

import settingsSaga from '../../app/sagas/settings';
import { notificationsSettingsActions, settingsActions } from '../../app/actions/settings';
import * as pushNotificationActions from '../../app/actions/pushNotifications';

import { tokenSelector } from '../../app/selectors/session';
import { apiRequest } from '../../app/utils/url';

jest.mock('react-native-sentry', () => ({
  Sentry: {
    captureException: jest.fn(),
  },
}));

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(),
}));

describe('settings saga', () => {
  const error = new Error('error');

  describe('initialization', () => {
    describe('push notifications', () => {
      it('should load the categories from the website and the local storage', () => expectSaga(settingsSaga)
        .dispatch(settingsActions.initStart())
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .silentRun()
        .then(() => {
          expect(apiRequest).toBeCalledWith('devices/categories', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Token token',
            },
          });
          expect(AsyncStorage.getItem).toBeCalledWith('@MyStore:pushCategories');
        }));

      it('should enable all categories initially if nothing found locally', () => expectSaga(settingsSaga)
        .dispatch(settingsActions.initStart())
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.fn(apiRequest), [{ key: 'cat1' }, { key: 'cat2' }]],
          [matchers.call.fn(AsyncStorage.getItem), null],
        ])
        .put(notificationsSettingsActions.success([
          { key: 'cat1', enabled: true },
          { key: 'cat2', enabled: true },
        ]))
        .put(settingsActions.initComplete())
        .silentRun());

      it('should enable only the categories in local storage', () => expectSaga(settingsSaga)
        .dispatch(settingsActions.initStart())
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.fn(apiRequest), [{ key: 'cat1' }, { key: 'cat2' }]],
          [matchers.call.fn(AsyncStorage.getItem), JSON.stringify(['cat1'])],
        ])
        .put(notificationsSettingsActions.success([
          { key: 'cat1', enabled: true },
          { key: 'cat2', enabled: false },
        ]))
        .put(settingsActions.initComplete())
        .silentRun());

      it('should fail upon error', () => expectSaga(settingsSaga)
        .dispatch(settingsActions.initStart())
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.fn(apiRequest), throwError(error)],
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
    it('should store new preferences in local storage', () => expectSaga(settingsSaga)
      .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
      .silentRun()
      .then(() => {
        expect(AsyncStorage.setItem).toBeCalledWith('@MyStore:pushCategories', JSON.stringify(['cat1']));
      }));

    it('should call the action to update preferences remotely', () => expectSaga(settingsSaga)
      .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
      .put(pushNotificationActions.register(['cat1']))
      .silentRun());

    it('should capture any exception', () => expectSaga(settingsSaga)
      .dispatch(notificationsSettingsActions.saveCategories(['cat1']))
      .provide([
        [matchers.call.fn(AsyncStorage.setItem), throwError(error)],
      ])
      .silentRun()
      .then(() => {
        expect(Sentry.captureException).toBeCalled();
      }));
  });
});
