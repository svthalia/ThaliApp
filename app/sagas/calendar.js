import { call, put, select, takeEvery } from 'redux-saga/effects';

import { apiRequest, tokenSelector } from '../utils/url';
import * as navigationActions from '../actions/navigation';
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
      // Swallow the error
    }
    yield put(calendarActions.success(events.concat(partnerEvents)));
  } catch (error) {
    yield put(calendarActions.failure());
  }
};

const calendarSaga = function* eventSaga() {
  yield takeEvery([
    calendarActions.REFRESH,
    action => action.type === navigationActions.NAVIGATE && action.payload.scene === 'eventList',
  ], calendar);
};

export default calendarSaga;
