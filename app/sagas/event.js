import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import Moment from 'moment';
import Snackbar from 'react-native-snackbar';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { apiRequest } from '../utils/url';
import * as eventActions from '../actions/event';
import { tokenSelector } from '../selectors/session';
import { currentEventSelector } from '../selectors/events';
import reportError from '../utils/errorReporting';

function* event(action) {
  const { pk, navigateToEventScreen } = action.payload;
  const token = yield select(tokenSelector);

  yield put(eventActions.fetching());

  if (navigateToEventScreen) {
    yield put(eventActions.open());
  }

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const eventData = yield call(apiRequest, `events/${pk}`, data);

    const params = {
      status: 'registered',
    };

    const eventRegistrations = yield call(apiRequest, `events/${pk}/registrations`, data, params);

    yield put(eventActions.success(
      eventData,
      eventRegistrations,
    ));
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
}

function* updateRegistration(action) {
  const { pk, present, payment } = action.payload;
  const token = yield select(tokenSelector);
  const currentEvent = yield select(currentEventSelector);

  yield put(eventActions.fetching());

  const data = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      present,
      payment,
    }),
  };

  try {
    yield call(apiRequest, `registrations/${pk}`, data);
    yield put(eventActions.event(currentEvent, false));
  } catch (error) {
    yield call(reportError, error);
    yield put(eventActions.failure());
  }
}

function* addToCalendar(action) {
  const {
    eventName,
    eventLocation,
    eventStart,
    eventEnd,
  } = action.payload;
  const eventConfig = {
    title: eventName,
    startDate: Moment(eventStart).toDate().toISOString(),
    endDate: Moment(eventEnd).toDate().toISOString(),
    location: eventLocation,
  };
  try {
    const eventInfo = yield call(AddCalendarEvent.presentEventCreatingDialog, eventConfig);
    if (eventInfo.action === 'SAVED') {
      yield call([Snackbar, 'show'], { text: 'Event added to calendar!' });
    }
  } catch (error) {
    yield call([Snackbar, 'show'], { text: 'Failed to add event to calendar!' });
  }
}

export default function* () {
  yield takeEvery(eventActions.EVENT, event);
  yield takeEvery(eventActions.UPDATE_REGISTRATION, updateRegistration);
  yield takeEvery(eventActions.ADD_TO_CALENDAR, addToCalendar);
}
