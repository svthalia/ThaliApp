import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { apiRequest, tokenSelector } from '../../app/url';
import calendarSaga from '../../app/sagas/calendar';

import * as calendarActions from '../../app/actions/calendar';
import * as navActions from '../../app/actions/navigation';

jest.mock('../../app/url', () => ({
  apiRequest: jest.fn(() => {}),
  tokenSelector: () => 'token',
}));

describe('calendar saga', () => {
  const error = new Error('error');

  it('should start fetching on refresh', () => expectSaga(calendarSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(calendarActions.refresh())
    .put(calendarActions.fetching())
    .silentRun());

  it('should start fetching on navigate', () => expectSaga(calendarSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(navActions.navigate('eventList'))
    .put(calendarActions.fetching())
    .silentRun());

  it('should put an error when the api request fails', () => expectSaga(calendarSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), throwError(error)],
    ])
    .dispatch(calendarActions.refresh())
    .put(calendarActions.failure())
    .silentRun());

  it('should put the result data when the request succeeds', () => expectSaga(calendarSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['events'] }), [{ pk: 1 }]],
      [matchers.call.like({ fn: apiRequest, args: ['partners/events'] }), [{ pk: 2 }]],
    ])
    .dispatch(calendarActions.refresh())
    .put(calendarActions.success([{ pk: 1 }, { pk: -2, partner: true }]))
    .silentRun());

  it('should do two GET requests', () => expectSaga(calendarSaga)
    .provide([
      [select(tokenSelector), 'usertoken'],
    ])
    .dispatch(calendarActions.refresh())
    .silentRun()
    .then(() => {
      expect(apiRequest).toBeCalledWith('events', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token usertoken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      expect(apiRequest).toBeCalledWith('partners/events', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token usertoken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
    }));
});
