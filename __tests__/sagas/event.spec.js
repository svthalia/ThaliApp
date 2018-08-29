import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { apiRequest, tokenSelector } from '../../app/utils/url';
import eventSaga from '../../app/sagas/event';

import * as eventActions from '../../app/actions/event';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
  tokenSelector: () => 'token',
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

describe('event saga', () => {
  const error = new Error('error');

  it('should start fetching', () => expectSaga(eventSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(eventActions.event(1))
    .put(eventActions.fetching())
    .silentRun());

  it('should put an error when the api request fails', () => expectSaga(eventSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), throwError(error)],
    ])
    .dispatch(eventActions.event(1))
    .put(eventActions.failure())
    .silentRun());

  it('should put the result data when the request succeeds', () => expectSaga(eventSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['events/1'] }), 'eventData'],
      [matchers.call.like({ fn: apiRequest, args: ['events/1/registrations'] }), 'regData'],
    ])
    .dispatch(eventActions.event(1))
    .put(eventActions.success('eventData', 'regData'))
    .silentRun());

  it('should do two GET requests', () => expectSaga(eventSaga)
    .provide([
      [select(tokenSelector), 'usertoken'],
    ])
    .dispatch(eventActions.event(1))
    .silentRun()
    .then(() => {
      expect(apiRequest).toBeCalledWith('events/1', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token usertoken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
      expect(apiRequest).toBeCalledWith('events/1/registrations', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token usertoken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }, { status: 'registered' });
    }));
});
