import AsyncStorage from '@react-native-community/async-storage';
import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import { GITLAB_TOKEN } from 'react-native-dotenv';

import { notificationsSettingsActions, settingsActions, bugReportActions } from '../actions/settings';
import * as navigationActions from '../actions/navigation';
import { apiRequest, issueUrl } from '../utils/url';
import * as pushNotifactionsActions from '../actions/pushNotifications';
import { tokenSelector, usernameSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';
import i18next from '../utils/i18n';

const PUSHCATEGORYKEY = '@MyStore:pushCategories';

const t = i18next.getFixedT(undefined, 'sagas/settings');

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
    yield call(reportError, error);
    yield put(notificationsSettingsActions.failure());
  }
}

function* saveCategories(action) {
  const { categories } = action;

  try {
    yield call(AsyncStorage.setItem, PUSHCATEGORYKEY, JSON.stringify(categories));
    yield put(pushNotifactionsActions.register(categories));
  } catch (error) {
    yield call(reportError, error);
  }
}

function* init() {
  yield all([
    pushNotifications(),
  ]);
  yield put(settingsActions.initComplete());
}

function* reportBug(action) {
  const { bugContent, bugTitle } = action.payload;
  const username = yield select(usernameSelector);
  try {
    const response = yield call(fetch, issueUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GITLAB_TOKEN}`,
      },
      body: JSON.stringify({
        title: bugTitle,
        description: `Issue submitted by: ${username}\n\n${bugContent}`,
        labels: 'in-app, bug',
      }),
    });
    if (response.status < 400) {
      yield call([Snackbar, 'show'], { title: t('Issue sent!') });
    } else {
      yield call([Snackbar, 'show'], { title: t('Failed to send issue, try again later.') });
    }
  } catch (error) {
    yield call(reportError, error);
    yield call([Snackbar, 'show'], { title: t('An issue was encountered while performing the request.') });
  }
  yield put(navigationActions.goBack());
}

export default function* () {
  yield takeEvery(settingsActions.INIT_START, init);
  yield takeEvery(notificationsSettingsActions.SAVE_CATEGORIES, saveCategories);
  yield takeEvery(bugReportActions.REPORT_BUG, reportBug);
}
