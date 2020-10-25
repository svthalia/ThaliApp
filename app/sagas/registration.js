import { call, put, select, takeEvery, delay } from 'redux-saga/effects';
import Snackbar from 'react-native-snackbar';

import * as eventActions from '../actions/event';
import * as registrationActions from '../actions/registration';
import { currentEventSelector } from '../selectors/events';
import reportError from '../utils/errorReporting';
import { deleteRequest, getRequest, postRequest } from './utils/api';

const register = function* register(action) {
  const { event } = action.payload;

  yield put(eventActions.fetching());

  try {
    const registration = yield call(postRequest, `events/${event}/registrations`);

    yield put(eventActions.event(event, false));
    if (registration.fields && Object.keys(registration.fields).length > 0) {
      yield put(registrationActions.retrieveFields(registration.pk));
    }
    yield call([Snackbar, 'show'], { text: 'Registration successful!' });
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
};

const update = function* update(action) {
  const { registration, fields } = action.payload;

  yield put(registrationActions.loading());

  const body = {};

  Object.keys(fields).forEach((key) => {
    if (fields[key] !== undefined) {
      body[`fields[${key}]`] = fields[key];
    }
  });

  try {
    yield call(postRequest, `registrations/${registration}`, body);
    yield put(registrationActions.success());
    yield delay(50);
    yield call([Snackbar, 'show'], {
      text: 'Successfully updated registration',
    });
  } catch (error) {
    if (error.response.status === 400) {
      yield call([Snackbar, 'show'], {
        text: 'The field values are not correct',
      });
    } else {
      yield call(reportError, error);
      yield put(registrationActions.failure());
    }
  }
};

const cancel = function* cancel(action) {
  const { registration } = action.payload;
  const event = yield select(currentEventSelector);

  yield put(eventActions.fetching());

  try {
    yield call(deleteRequest, `registrations/${registration}`);
    yield call([Snackbar, 'show'], {
      text: 'Successfully cancelled registration',
    });
  } catch (error) {
    yield call(reportError, error);
  }

  yield put(eventActions.event(event, false));
};

const fields = function* fields(action) {
  const { registration } = action.payload;

  yield put(registrationActions.loading());

  try {
    const response = yield call(getRequest, `registrations/${registration}`);
    yield put(registrationActions.showFields(registration, response.fields));
    yield put(eventActions.done());
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
};

export default function* registrationSaga() {
  yield takeEvery(registrationActions.REGISTER, register);
  yield takeEvery(registrationActions.UPDATE, update);
  yield takeEvery(registrationActions.CANCEL, cancel);
  yield takeEvery(registrationActions.FIELDS, fields);
}
