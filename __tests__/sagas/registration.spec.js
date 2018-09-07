import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import Snackbar from 'react-native-snackbar';
import { select } from 'redux-saga/effects';
import * as registrationActions from '../../app/actions/registration';
import registrationSaga, { eventSelector } from '../../app/sagas/registration';
import { apiRequest } from '../../app/utils/url';
import * as eventActions from '../../app/actions/event';
import { tokenSelector } from '../../app/selectors/session';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
  show: jest.fn(),
  dismiss: jest.fn(),
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
}));

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'token',
}));

describe('event selector', () => {
  it('should select the event pk', () => {
    expect(eventSelector({ event: { data: { pk: 2 } } })).toEqual(2);
  });
});

describe('registration saga', () => {
  const error = new Error('error');

  beforeEach(() => {
    apiRequest.mockReset();
    Snackbar.show.mockReset();
  });

  describe('registering', () => {
    it('should put a fetching action', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(registrationActions.register(1))
      .put(eventActions.fetching())
      .silentRun());

    it('should put the result data when the request succeeds', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['events/1/registrations'] }), { }],
      ])
      .dispatch(registrationActions.register(1))
      .put(eventActions.event(1))
      .silentRun());

    it('should show a snackbar when the request succeeds', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['events/1/registrations'] }), { }],
      ])
      .dispatch(registrationActions.register(1))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Registration successful!' },
        );
      }));

    it('should show a failure action when the request fails', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(registrationActions.register(1))
      .put(eventActions.failure())
      .silentRun());

    it('should do a POST request', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(registrationActions.register(1))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('events/1/registrations', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      }));
  });

  describe('updating', () => {
    it('should put a loading action', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] })],
      ])
      .dispatch(registrationActions.update(1, {}))
      .put(registrationActions.loading())
      .silentRun());

    it('should put a success action on success', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] })],
      ])
      .dispatch(registrationActions.update(1, {}))
      .put(registrationActions.success())
      .silentRun());

    it('should show a snackbar on success', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] })],
      ])
      .dispatch(registrationActions.update(1, {}))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Successfully updated registration' },
        );
      }));

    it('should put failure action when the request fails', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(registrationActions.update(1, {}))
      .put(registrationActions.failure())
      .silentRun());

    it('should do a PUT request with fields', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(registrationActions.update(2, { key: 'value' }))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('registrations/2', {
          body: '{"fields[key]":"value"}',
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'PUT',
        });
      }));
  });

  describe('cancelling', () => {
    it('should put a fetching action', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] })],
      ])
      .dispatch(registrationActions.cancel(1))
      .put(eventActions.fetching())
      .silentRun());

    it('should show a snackbar on success', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.like({ fn: apiRequest, args: ['registrations/1'] })],
      ])
      .dispatch(registrationActions.cancel(1))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).toBeCalledWith(
          { title: 'Successfully cancelled registration' },
        );
      }));

    it('should put event action when the request succeeds', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.fn(apiRequest), {}],
      ])
      .dispatch(registrationActions.cancel(1))
      .put(eventActions.event(1))
      .silentRun());

    it('should put event action when the request fails', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(registrationActions.cancel(1))
      .silentRun());

    it('should not show snackbar when the request fails', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(registrationActions.cancel(1))
      .silentRun()
      .then(() => {
        expect(Snackbar.show).not.toBeCalled();
      }));

    it('should do a DELETE request', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
      ])
      .dispatch(registrationActions.cancel(2))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('registrations/2', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
      }));
  });

  describe('fields', () => {
    it('should put a loading action', () => expectSaga(registrationSaga)
      .dispatch(registrationActions.retrieveFields(1))
      .put(registrationActions.loading())
      .silentRun());

    it('should put showFields action when the request succeeds', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.fn(apiRequest), { fields: 'fields' }],
      ])
      .dispatch(registrationActions.retrieveFields(1))
      .put(registrationActions.showFields(1, 'fields'))
      .silentRun());

    it('should put events done action when the request succeeds', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.fn(apiRequest), { fields: 'fields' }],
      ])
      .dispatch(registrationActions.retrieveFields(1))
      .put(eventActions.done())
      .silentRun());

    it('should put event failure action when the request fails', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [select(eventSelector), 1],
        [matchers.call.fn(apiRequest), throwError(error)],
      ])
      .dispatch(eventActions.failure())
      .silentRun());

    it('should do a GET request', () => expectSaga(registrationSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(registrationActions.retrieveFields(2))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('registrations/2', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
      }));
  });
});
