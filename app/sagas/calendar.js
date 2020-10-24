import { call, put, takeEvery } from 'redux-saga/effects';

import * as calendarActions from '../actions/calendar';
import reportError from '../utils/errorReporting';
import { getRequest } from './utils/api';

const calendar = function* calendar(action) {
  const { keywords } = action.payload;
  yield put(calendarActions.fetching());

  let params;
  if (keywords) {
    params = {
      search: keywords,
    };
  }

  try {
    const events = yield call(getRequest, 'events', params);
    let partnerEvents = [];
    try {
      partnerEvents = yield call(getRequest, 'partners/events', params);
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
