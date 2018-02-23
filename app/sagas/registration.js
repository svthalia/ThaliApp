import { delay } from 'redux-saga';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import { apiRequest, tokenSelector } from '../utils/url';

import * as eventActions from '../actions/event';
import * as navigationActions from '../actions/navigation';
import * as registrationActions from '../actions/registration';


export const eventSelector = state => state.event.data.pk;


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

    yield put(eventActions.event(event));
    if (registration.fields) {
      yield put(registrationActions.retrieveFields(registration.pk));
    }
    Snackbar.show({ title: 'Registration successful!' });
  } catch (error) {
    yield put(eventActions.failure());
  }
};

const update = function* update(action) {
  const { registration, fields } = action.payload;
  const token = yield select(tokenSelector);

  yield put(registrationActions.loading());

  const body = {};

  Object.keys(fields).forEach((key) => {
    body[`fields[${key}]`] = fields[key];
  });

  const data = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    yield call(apiRequest, `registrations/${registration}`, data);
    yield put(navigationActions.back());
    yield put(registrationActions.success());
    yield delay(50);
    Snackbar.show({ title: 'Successfully updated registration' });
  } catch (error) {
    yield put(registrationActions.failure());
  }
};

const cancel = function* cancel(action) {
  const { registration } = action.payload;
  const token = yield select(tokenSelector);
  const event = yield select(eventSelector);

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
    Snackbar.show({ title: 'Successfully cancelled registration' });
  } catch (error) {
    // Swallow error for now
  }

  yield put(eventActions.event(event));
};

const fields = function* fields(action) {
  const { registration } = action.payload;
  const token = yield select(tokenSelector);

  yield put(registrationActions.loading());
  yield put(navigationActions.navigate('registration'));

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
    yield put(eventActions.failure());
  }
};

const registrationSaga = function* registrationSaga() {
  yield takeEvery(registrationActions.REGISTER, register);
  yield takeEvery(registrationActions.UPDATE, update);
  yield takeEvery(registrationActions.CANCEL, cancel);
  yield takeEvery(registrationActions.FIELDS, fields);
};

export default registrationSaga;
