import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import profileSaga from '../../app/sagas/profile';
import { apiRequest, tokenSelector } from '../../app/utils/url';
import * as profileActions from '../../app/actions/profile';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
  tokenSelector: () => 'token',
}));

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

describe('profile saga', () => {
  const error = new Error('error');

  it('should start fetching and navigate', () => expectSaga(profileSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(profileActions.profile(1))
    .put(profileActions.fetching())
    .silentRun());

  it('should put success when the request succeeds', () => expectSaga(profileSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['members/1'] }), 'data'],
    ])
    .dispatch(profileActions.profile(1))
    .put(profileActions.success('data'))
    .silentRun());

  it('should put failure when the request fails', () => expectSaga(profileSaga)
    .provide([
      [select(tokenSelector), 'token'],
      [matchers.call.like({ fn: apiRequest, args: ['members/1'] }), throwError(error)],
    ])
    .dispatch(profileActions.profile(1))
    .put(profileActions.failure())
    .silentRun());

  it('should do a GET request', () => expectSaga(profileSaga)
    .provide([
      [select(tokenSelector), 'token'],
    ])
    .dispatch(profileActions.profile(1))
    .silentRun()
    .then(() => {
      expect(apiRequest).toBeCalledWith('members/1', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Token token',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      });
    }));
});