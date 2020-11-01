import { call, put, select, takeEvery } from 'redux-saga/effects';

import { apiRequest } from '../utils/url';
import * as calendarActions from '../actions/calendar';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

const calendar = function* calendar(action) {
  const { keywords } = action.payload;
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

  let params = null;
  if (keywords) {
    params = {
      search: keywords,
    };
  }

  try {
    const events = yield call(apiRequest, 'events', data, params);
    let partnerEvents = [];
    try {
      partnerEvents = yield call(apiRequest, 'partners/events', data, params);
      partnerEvents = partnerEvents.map((event) => ({
        ...event,
        pk: -event.pk,
        partner: true,
      }));
    } catch (error) {
      yield call(reportError, error);
    }
    yield put(calendarActions.success(events.concat(partnerEvents), keywords));
  } catch (error) {
    yield call(reportError, error);
    yield put(calendarActions.failure());
  }
};

export default function* calendarSaga() {
  yield takeEvery(calendarActions.EVENTS, calendar);
}
