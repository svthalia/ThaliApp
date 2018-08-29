import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';

import { apiRequest, tokenSelector } from '../utils/url';
import * as calendarActions from '../actions/calendar';

const calendar = function* calendar() {
  const token = yield select(tokenSelector);
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  yield put(calendarActions.fetching());

  try {
    const events = yield call(apiRequest, 'events', data);
    let partnerEvents = [];
    try {
      partnerEvents = yield call(apiRequest, 'partners/events', data);
      partnerEvents = partnerEvents.map(event => ({
        ...event,
        pk: -event.pk,
        partner: true,
      }));
    } catch (error) {
      Sentry.captureException(error);
    }
    yield put(calendarActions.success(events.concat(partnerEvents)));
  } catch (error) {
    Sentry.captureException(error);
    yield put(calendarActions.failure());
  }
};

const calendarSaga = function* eventSaga() {
  yield takeEvery(calendarActions.REFRESH, calendar);
};

export default calendarSaga;
