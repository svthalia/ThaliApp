import { call, put, takeEvery } from 'redux-saga/effects';

import { apiRequest } from '../url';
import * as eventActions from '../actions/event';
import * as navActions from '../actions/navigation';

const event = function* event(action) {
  const { pk, token } = action.payload;

  yield put(eventActions.fetching());
  yield put(navActions.navigate('event'));

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    let response = yield call(apiRequest, `events/${pk}`, data);
    const eventData = response.content;

    if (!response.success) {
      throw Error();
    }

    const params = {
      status: 'registered',
    };

    response = yield call(apiRequest, `events/${pk}/registrations`, data, params);
    const eventRegistrations = response.content;

    if (!response.success) {
      throw Error();
    }

    yield put(eventActions.success(
      eventData,
      eventRegistrations,
    ));
  } catch (error) {
    yield put(eventActions.failure());
  }
};

const eventSaga = function* eventSaga() {
  yield takeEvery(eventActions.EVENT, event);
};

export default eventSaga;
