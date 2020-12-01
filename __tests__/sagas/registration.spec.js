import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import Snackbar from 'react-native-snackbar';
import { select } from 'redux-saga/effects';
import * as registrationActions from '../../app/actions/registration';
import registrationSaga from '../../app/sagas/registration';
import * as eventActions from '../../app/actions/event';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '../../app/sagas/utils/api';
import { currentEventSelector } from '../../app/selectors/events';

const { ServerError } = jest.requireActual('../../app/sagas/utils/api');

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
  show: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
}));

describe('event selector', () => {
  it('should select the event pk', () => {
    expect(currentEventSelector({ event: { data: { pk: 2 } } })).toEqual(2);
  });
});

describe('registration saga', () => {
  const errorResponse = { status: 500 };
  const error = new ServerError('Invalid status code: 500', errorResponse);

  beforeEach(() => {
    Snackbar.show.mockReset();
  });

  describe('registering', () => {
    it('should put a fetching action', () =>
      expectSaga(registrationSaga)
        .dispatch(registrationActions.register(1))
        .put(eventActions.fetching())
        .silentRun());

    it('should put the result data when the request succeeds', () =>
      expectSaga(registrationSaga)
        .provide([
          [
            matchers.call.like({
              fn: postRequest,
              args: ['events/1/registrations'],
            }),
            {},
          ],
        ])
        .dispatch(registrationActions.register(1))
        .put(eventActions.event(1, false))
        .silentRun());

    it('should show a snackbar when the request succeeds', () =>
      expectSaga(registrationSaga)
        .provide([
          [
            matchers.call.like({
              fn: postRequest,
              args: ['events/1/registrations'],
            }),
            {},
          ],
        ])
        .dispatch(registrationActions.register(1))
        .silentRun()
        .then(() => {
          expect(Snackbar.show).toBeCalledWith({
            text: 'Registration successful!',
          });
        }));

    it('should show a failure action when the request fails', () =>
      expectSaga(registrationSaga)
        .provide([[matchers.call.fn(postRequest), throwError(error)]])
        .dispatch(registrationActions.register(1))
        .put(eventActions.failure())
        .silentRun());

    it('should do a POST request', () =>
      expectSaga(registrationSaga)
        .dispatch(registrationActions.register(1))
        .call(postRequest, 'events/1/registrations')
        .silentRun());
  });

  describe('updating', () => {
    it('should put a loading action', () =>
      expectSaga(registrationSaga)
        .provide([
          [matchers.call.like({ fn: patchRequest, args: ['registrations/1'] })],
        ])
        .dispatch(registrationActions.update(1, {}))
        .put(registrationActions.loading())
        .silentRun());

    it('should put a success action on success', () =>
      expectSaga(registrationSaga)
        .provide([
          [matchers.call.like({ fn: patchRequest, args: ['registrations/1'] })],
        ])
        .dispatch(registrationActions.update(1, {}))
        .put(registrationActions.success())
        .silentRun());

    it('should show a snackbar on success', () =>
      expectSaga(registrationSaga)
        .provide([
          [matchers.call.like({ fn: patchRequest, args: ['registrations/1'] })],
        ])
        .dispatch(registrationActions.update(1, {}))
        .silentRun()
        .then(() => {
          expect(Snackbar.show).toBeCalledWith({
            text: 'Successfully updated registration',
          });
        }));

    it('should put failure action when the request fails', () =>
      expectSaga(registrationSaga)
        .provide([[matchers.call.fn(patchRequest), throwError(error)]])
        .dispatch(registrationActions.update(1, {}))
        .put(registrationActions.failure())
        .silentRun());

    it('should do a PATCH request with fields', () =>
      expectSaga(registrationSaga)
        .dispatch(registrationActions.update(2, { key: 'value' }))
        .call(patchRequest, 'registrations/2', { 'fields[key]': 'value' })
        .silentRun());
  });

  describe('cancelling', () => {
    it('should put a fetching action', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.like({ fn: deleteRequest, args: ['registrations/1'] })],
        ])
        .dispatch(registrationActions.cancel(1))
        .put(eventActions.fetching())
        .silentRun());

    it('should show a snackbar on success', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.like({ fn: deleteRequest, args: ['registrations/1'] })],
        ])
        .dispatch(registrationActions.cancel(1))
        .silentRun()
        .then(() => {
          expect(Snackbar.show).toBeCalledWith({
            text: 'Successfully cancelled registration',
          });
        }));

    it('should put event action when the request succeeds', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.fn(deleteRequest), {}],
        ])
        .dispatch(registrationActions.cancel(1))
        .put(eventActions.event(1, false))
        .silentRun());

    it('should put event action when the request fails', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.fn(deleteRequest), throwError(error)],
        ])
        .dispatch(registrationActions.cancel(1))
        .silentRun());

    it('should not show snackbar when the request fails', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.fn(deleteRequest), throwError(error)],
        ])
        .dispatch(registrationActions.cancel(1))
        .silentRun()
        .then(() => {
          expect(Snackbar.show).not.toBeCalled();
        }));

    it('should do a DELETE request', () =>
      expectSaga(registrationSaga)
        .provide([[select(currentEventSelector), 1]])
        .dispatch(registrationActions.cancel(2))
        .call(deleteRequest, 'registrations/2')
        .silentRun());
  });

  describe('fields', () => {
    it('should retrieve the fields after a successful registration', () =>
      expectSaga(registrationSaga)
        .provide([[matchers.call.fn(postRequest), { pk: 1, fields: 'fields' }]])
        .dispatch(registrationActions.register(2))
        .put(registrationActions.retrieveFields(1))
        .silentRun());

    it('should put a loading action', () =>
      expectSaga(registrationSaga)
        .dispatch(registrationActions.retrieveFields(1))
        .put(registrationActions.loading())
        .silentRun());

    it('should put showFields action when the request succeeds', () =>
      expectSaga(registrationSaga)
        .provide([[matchers.call.fn(getRequest), { fields: 'fields' }]])
        .dispatch(registrationActions.retrieveFields(1))
        .put(registrationActions.showFields(1, 'fields'))
        .silentRun());

    it('should put events done action when the request succeeds', () =>
      expectSaga(registrationSaga)
        .provide([[matchers.call.fn(getRequest), { fields: 'fields' }]])
        .dispatch(registrationActions.retrieveFields(1))
        .put(eventActions.done())
        .silentRun());

    it('should put event failure action when the request fails', () =>
      expectSaga(registrationSaga)
        .provide([
          [select(currentEventSelector), 1],
          [matchers.call.fn(getRequest), throwError(error)],
        ])
        .dispatch(eventActions.failure())
        .silentRun());

    it('should do a GET request', () =>
      expectSaga(registrationSaga)
        .dispatch(registrationActions.retrieveFields(2))
        .call(getRequest, 'registrations/2')
        .silentRun());
  });
});
