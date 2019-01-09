import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { apiRequest } from '../../app/utils/url';
import eventSaga from '../../app/sagas/event';

import * as eventActions from '../../app/actions/event';
import { tokenSelector } from '../../app/selectors/session';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'token',
}));

describe('event saga', () => {
  const error = new Error('error');

  describe('load event', () => {
    it('should start fetching', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(eventActions.event(1))
      .put(eventActions.fetching())
      .silentRun());

    it('should open the event screen when specified', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(eventActions.event(1))
      .put(eventActions.open())
      .silentRun());

    it('should not open the event screen when told not to', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(eventActions.event(1, false))
      .not.put(eventActions.open())
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

  describe('update registration', () => {
    it('should start fetching', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(eventActions.updateRegistration(1, true, 'payment'))
      .put(eventActions.fetching())
      .silentRun());

    it('should do a PATCH request', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(eventActions.updateRegistration(1, true, 'payment'))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('registrations/1', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
          body: '{"present":true,"payment":"payment"}',
        });
      }));

    it('should be done when the request is successful', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] }), 'response'],
      ])
      .dispatch(eventActions.updateRegistration(1, true, 'payment'))
      .put(eventActions.done())
      .silentRun());

    it('should put an error when the request fails', () => expectSaga(eventSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] }), throwError(error)],
      ])
      .dispatch(eventActions.updateRegistration(1, true, 'payment'))
      .put(eventActions.failure())
      .silentRun());
  });
});
