import AsyncStorage from '@react-native-community/async-storage';
import { all, call, put, takeEvery } from 'redux-saga/effects';

import { notificationsSettingsActions, settingsActions } from '../actions/settings';

import * as pushNotifactionsActions from '../actions/pushNotifications';
import { STORAGE_PUSH_CATEGORIES } from '../constants';
import reportError from '../utils/errorReporting';
import { getRequest } from './utils/api';

function* pushNotifications() {
  try {
    const categoryList = yield call(getRequest, 'devices/categories');
    const preferencesJson = yield call(
      [AsyncStorage, 'getItem'],
      STORAGE_PUSH_CATEGORIES
    );

    if (preferencesJson === null) {
      for (let i = 0; i < categoryList.length; i += 1) {
        categoryList[i].enabled = true;
      }
    } else {
      const categoryPreferences = JSON.parse(preferencesJson);
      for (let i = 0; i < categoryList.length; i += 1) {
        categoryList[i].enabled = categoryPreferences.includes(categoryList[i].key);
      }
    }

    yield put(notificationsSettingsActions.success(categoryList));
  } catch (error) {
    yield call(reportError, error);
    yield put(notificationsSettingsActions.failure());
  }
}

function* saveCategories(action) {
  const { categories } = action;

  try {
    yield call(
      [AsyncStorage, 'setItem'],
      STORAGE_PUSH_CATEGORIES,
      JSON.stringify(categories)
    );
    yield put(pushNotifactionsActions.register(categories));
  } catch (error) {
    yield call(reportError, error);
  }
}

function* init() {
  yield all([pushNotifications()]);
  yield put(settingsActions.initComplete());
}

export default function* settingsSaga() {
  yield takeEvery(settingsActions.INIT_START, init);
  yield takeEvery(notificationsSettingsActions.SAVE_CATEGORIES, saveCategories);
}
