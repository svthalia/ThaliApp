import { delay } from 'redux-saga';
import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';
import i18next from '../utils/i18n';

import { apiRequest } from '../utils/url';

import * as eventActions from '../actions/event';
import * as registrationActions from '../actions/registration';
import { tokenSelector } from '../selectors/session';
import { currentEventSelector } from '../selectors/events';
import reportError from '../utils/errorReporting';

const t = i18next.getFixedT(undefined, 'sagas/registration');

const register = function* register(action) {
  const { event } = action.payload;
  const token = yield select(tokenSelector);

  yield put(eventActions.fetching());

  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const registration = yield call(apiRequest, `events/${event}/registrations`, data);

    yield put(eventActions.event(event, false));
    if (registration.fields && Object.keys(registration.fields).length > 0) {
      yield put(registrationActions.retrieveFields(registration.pk));
    }
    yield call([Snackbar, 'show'], { title: t('Registration successful!') });
    yield call([Snackbar, 'show'], { title: t('Registration successful!') });
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
};

const update = function* update(action) {
  const { registration, fields } = action.payload;
  const token = yield select(tokenSelector);

  yield put(registrationActions.loading());

  const body = {};

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined && fields[key] !== '') {
      body[`fields[${key}]`] = fields[key];
    }
  });

  const data = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    yield call(apiRequest, `registrations/${registration}`, data);
    yield put(registrationActions.success());
    yield delay(50);
    yield call([Snackbar, 'show'], { title: t('Successfully updated registration') });
  } catch (error) {
    if (error.response.status === 400) {
      yield call([Snackbar, 'show'], { title: 'The field values are not correct' });
    } else {
      yield call(reportError, error);
      yield put(registrationActions.failure());
    }
  }
};

const cancel = function* cancel(action) {
  const { registration } = action.payload;
  const token = yield select(tokenSelector);
  const event = yield select(currentEventSelector);

  yield put(eventActions.fetching());

  const data = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    yield call(apiRequest, `registrations/${registration}`, data);
    yield call([Snackbar, 'show'], { title: t('Successfully cancelled registration') });
  } catch (error) {
    yield call(reportError, error);
  }

  yield put(eventActions.event(event, false));
};

const fields = function* fields(action) {
  const { registration } = action.payload;
  const token = yield select(tokenSelector);

  yield put(registrationActions.loading());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = yield call(apiRequest, `registrations/${registration}`, data);
    yield put(registrationActions.showFields(registration, response.fields));
    yield put(eventActions.done());
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
};

export default function* () {
  yield takeEvery(registrationActions.REGISTER, register);
  yield takeEvery(registrationActions.UPDATE, update);
  yield takeEvery(registrationActions.CANCEL, cancel);
  yield takeEvery(registrationActions.FIELDS, fields);
}
