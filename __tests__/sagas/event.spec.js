import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { apiRequest } from '../../app/url';
import eventSaga from '../../app/sagas/event';

import * as eventActions from '../../app/actions/event';
import * as navActions from '../../app/actions/navigation';


describe('event api call', () => {
  const error = new Error('error');

  it('should start fetching', () => expectSaga(eventSaga)
      .provide([
        [matchers.call.fn(apiRequest), []],
      ])
      .dispatch(eventActions.event(1))
      .put(eventActions.fetching())
      .silentRun());

  it('should navigate to the event scene', () => expectSaga(eventSaga)
    .provide([
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(eventActions.event(1))
    .put(navActions.navigate('event'))
    .silentRun());

  it('should put an error when the api request fails', () => expectSaga(eventSaga)
    .provide([
      [matchers.call.fn(apiRequest), throwError(error)],
    ])
    .dispatch(eventActions.event(1, 'token'))
    .put(eventActions.failure())
    .silentRun());

  it('should put the result data when the request succeeds', () => expectSaga(eventSaga)
    .provide([
      [matchers.call.like({ fn: apiRequest, args: ['events/1'] }), 'eventData'],
      [matchers.call.like({ fn: apiRequest, args: ['events/1/registrations'] }), 'regData'],
    ])
    .dispatch(eventActions.event(1, 'token'))
    .put(eventActions.success('eventData', 'regData'))
    .silentRun());
});
