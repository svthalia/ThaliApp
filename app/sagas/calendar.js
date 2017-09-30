import { call, put, select, takeEvery } from 'redux-saga/effects';

import { apiRequest, tokenSelector } from '../url';
import * as types from '../actions/actionTypes';
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
    action => action.type === types.NAVIGATE && action.scene === 'eventList',
  ], calendar);
};

export default calendarSaga;
