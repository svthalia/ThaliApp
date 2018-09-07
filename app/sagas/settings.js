import { AsyncStorage } from 'react-native';
import { Sentry } from 'react-native-sentry';
import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';

import { notificationsSettingsActions, settingsActions } from '../actions/settings';

import { apiRequest } from '../utils/url';
import * as pushNotifactionsActions from '../actions/pushNotifications';
import { tokenSelector } from '../selectors/session';

const PUSHCATEGORYKEY = '@MyStore:pushCategories';

function* pushNotifications() {
  const token = yield select(tokenSelector);

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const categoryList = yield call(apiRequest, 'devices/categories', data);
    const preferencesJson = yield call(AsyncStorage.getItem, PUSHCATEGORYKEY);

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
    Sentry.captureException(error);
    yield put(notificationsSettingsActions.failure());
  }
}

function* saveCategories(action) {
  const { categories } = action;

  try {
    yield call(AsyncStorage.setItem, PUSHCATEGORYKEY, JSON.stringify(categories));
    yield put(pushNotifactionsActions.register(categories));
  } catch (error) {
    Sentry.captureException(error);
  }
}

function* init() {
  yield all([
    pushNotifications(),
  ]);
  yield put(settingsActions.initComplete());
}

function* settingsSaga() {
  yield takeEvery(settingsActions.INIT_START, init);
  yield takeEvery(notificationsSettingsActions.SAVE_CATEGORIES, saveCategories);
}

export default settingsSaga;
