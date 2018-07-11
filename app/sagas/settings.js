import { AsyncStorage } from 'react-native';
import { takeEvery, select, call, put } from 'redux-saga/effects';

import { pushNotificationsSettingsActions } from '../actions/settings';
import * as navigationActions from '../actions/navigation';

import { apiRequest, tokenSelector } from '../utils/url';

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

  yield put(pushNotificationsSettingsActions.loading());
  yield put(navigationActions.navigate('pushNotificationsSettings'));

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

    yield put(pushNotificationsSettingsActions.success(categoryList));
  } catch (error) {
    yield put(pushNotificationsSettingsActions.failure());
  }
}

function* saveCategories(action) {
  const { categories } = action;

  try {
    yield call(AsyncStorage.setItem, PUSHCATEGORYKEY, JSON.stringify(categories));
  } catch (error) {
    // Swallow error
  }
}

function* settingsSaga() {
  yield takeEvery(pushNotificationsSettingsActions.RETRIEVE, pushNotifications);
  yield takeEvery(pushNotificationsSettingsActions.SAVE_CATEGORIES, saveCategories);
}

export default settingsSaga;
