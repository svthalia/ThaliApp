import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import eventSaga from '../../app/sagas/event';

import * as eventActions from '../../app/actions/event';
import { getRequest, patchRequest } from '../../app/sagas/utils/api';
import { currentEventSelector } from '../../app/selectors/events';

jest.mock('react-native-snackbar', () => ({
  Snackbar: jest.fn(),
}));

jest.mock('../../app/sagas/utils/api', () => ({
  getRequest: jest.fn(() => {}),
  patchRequest: jest.fn(() => {}),
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

describe('event saga', () => {
  const error = new Error('error');

  describe('load event', () => {
    it('should start fetching', () =>
      expectSaga(eventSaga)
        .dispatch(eventActions.event(1))
        .put(eventActions.fetching())
        .silentRun());

    it('should open the event screen when specified', () =>
      expectSaga(eventSaga)
        .dispatch(eventActions.event(1))
        .put(eventActions.open())
        .silentRun());

    it('should not open the event screen when told not to', () =>
      expectSaga(eventSaga)
        .dispatch(eventActions.event(1, false))
        .not.put(eventActions.open())
        .silentRun());

    it('should put an error when the api request fails', () =>
      expectSaga(eventSaga)
        .provide([[matchers.call.fn(getRequest), throwError(error)]])
        .dispatch(eventActions.event(1))
        .put(eventActions.failure())
        .silentRun());

    it('should put the result data when the request succeeds', () =>
      expectSaga(eventSaga)
        .provide([
          [matchers.call.like({ fn: getRequest, args: ['events/1'] }), 'eventData'],
          [
            matchers.call.like({
              fn: getRequest,
              args: ['events/1/registrations'],
            }),
            'regData',
          ],
        ])
        .dispatch(eventActions.event(1))
        .put(eventActions.success('eventData', 'regData'))
        .silentRun());

    it('should do two GET requests', () =>
      expectSaga(eventSaga)
        .dispatch(eventActions.event(1))
        .silentRun()
        .then(() => {
          expect(getRequest).toBeCalledWith('events/1');
          expect(getRequest).toBeCalledWith('events/1/registrations', {
            status: 'registered',
          });
          expect(getRequest).toBeCalledWith('events/1');
        }));
  });

  describe('update registration', () => {
    it('should start fetching', () =>
      expectSaga(eventSaga)
        .provide([[select(currentEventSelector), 1]])
        .dispatch(eventActions.updateRegistration(1, true, 'payment'))
        .put(eventActions.fetching())
        .silentRun());

    it('should do a PATCH request', () =>
      expectSaga(eventSaga)
        .provide([[select(currentEventSelector), 1]])
        .dispatch(eventActions.updateRegistration(1, true, 'payment'))
        .silentRun()
        .then(() => {
          expect(patchRequest).toBeCalledWith('registrations/1', {
            payment: 'payment',
            present: true,
          });
        }));

    it('should refresh the event when the request is successful', () =>
      expectSaga(eventSaga)
        .provide([
          [select(currentEventSelector), 1],
          [
            matchers.call.like({ fn: getRequest, args: ['registrations/1'] }),
            'response',
          ],
        ])
        .dispatch(eventActions.updateRegistration(1, true, 'payment'))
        .put(eventActions.event(1, false))
        .silentRun());

    it('should put an error when the request fails', () =>
      expectSaga(eventSaga)
        .provide([
          [select(currentEventSelector), 1],
          [
            matchers.call.like({ fn: patchRequest, args: ['registrations/1'] }),
            throwError(error),
          ],
        ])
        .dispatch(eventActions.updateRegistration(1, true, 'payment'))
        .put(eventActions.failure())
        .silentRun());
  });
});
