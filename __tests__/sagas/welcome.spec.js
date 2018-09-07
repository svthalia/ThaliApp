import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import welcomeSaga from '../../app/sagas/welcome';
import { apiRequest } from '../../app/utils/url';
import * as welcomeActions from '../../app/actions/welcome';
import { tokenSelector } from '../../app/selectors/session';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
}));

jest.mock('../../app/selectors/session', () => ({
  tokenSelector: () => 'token',
}));

describe('welcome saga', () => {
  const error = new Error('error');

  it('should put success when the request succeeds', () => expectSaga(welcomeSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['events'] }), { results: 'data' }],
    ])
    .dispatch(welcomeActions.refresh())
    .put(welcomeActions.success('data'))
    .silentRun());

  it('should put failure when the request fails', () => expectSaga(welcomeSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['events'] }), throwError(error)],
    ])
    .dispatch(welcomeActions.refresh())
    .put(welcomeActions.failure())
    .silentRun());

  it('should do a GET request', () => expectSaga(welcomeSaga)
    .provide([
      [select(tokenSelector), 'usertoken'],
    ])
    .dispatch(welcomeActions.refresh())
    .silentRun()
    .then(() => {
      expect(apiRequest).toBeCalledWith('events', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token usertoken',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }, { limit: 5, ordering: 'start' });
    }));
});
