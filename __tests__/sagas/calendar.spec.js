import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as calendarActions from '../../app/actions/calendar';

import calendarSaga from '../../app/sagas/calendar';
import { getRequest } from '../../app/sagas/utils/api';

jest.mock('../../app/sagas/utils/api', () => ({
  getRequest: jest.fn(() => {}),
}));

describe('calendar saga', () => {
  const error = new Error('error');

  it('should start fetching on refresh', () =>
    expectSaga(calendarSaga)
      .provide([[matchers.call.fn(getRequest), []]])
      .dispatch(calendarActions.events())
      .put(calendarActions.fetching())
      .silentRun());

  it('should put an error when the api request fails', () =>
    expectSaga(calendarSaga)
      .provide([[matchers.call.fn(getRequest), throwError(error)]])
      .dispatch(calendarActions.events())
      .put(calendarActions.failure())
      .silentRun());

  it('should put the result data when the request succeeds', () =>
    expectSaga(calendarSaga)
      .provide([
        [matchers.call.like({ fn: getRequest, args: ['events'] }), [{ pk: 1 }]],
        [
          matchers.call.like({ fn: getRequest, args: ['partners/events'] }),
          [{ pk: 2 }],
        ],
      ])
      .dispatch(calendarActions.events())
      .put(calendarActions.success([{ pk: 1 }, { pk: -2, partner: true }], ''))
      .silentRun());

  it('should put keywords if they were passed', () =>
    expectSaga(calendarSaga)
      .provide([
        [matchers.call.like({ fn: getRequest, args: ['events'] }), [{ pk: 1 }]],
        [
          matchers.call.like({ fn: getRequest, args: ['partners/events'] }),
          [{ pk: 2 }],
        ],
      ])
      .dispatch(calendarActions.events('keywords'))
      .put(calendarActions.success([{ pk: 1 }, { pk: -2, partner: true }], 'keywords'))
      .silentRun());

  it('should do two GET requests', () =>
    expectSaga(calendarSaga)
      .dispatch(calendarActions.events())
      .silentRun()
      .then(() => {
        expect(getRequest).toBeCalledWith('events', undefined);
        expect(getRequest).toBeCalledWith('partners/events', undefined);
      }));
});
