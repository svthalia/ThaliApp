import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import { apiRequest } from '../utils/url';
import * as calendarActions from '../actions/calendar';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

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
      partnerEvents = partnerEvents.map((event) => ({
        ...event,
        pk: -event.pk,
        partner: true,
      }));
    } catch (error) {
      yield call(reportError, error);
    }
    yield put(calendarActions.success(events.concat(partnerEvents)));
  } catch (error) {
    yield call(reportError, error);
    yield put(calendarActions.failure());
  }
};

export default function* () {
  yield takeEvery(calendarActions.REFRESH, calendar);
}
