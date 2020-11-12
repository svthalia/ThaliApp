import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as profileActions from '../../app/actions/profile';
import profileSaga from '../../app/sagas/profile';
import { getRequest } from '../../app/sagas/utils/api';

jest.mock('react-native-snackbar', () => ({
  LENGTH_LONG: 100,
  show: jest.fn(),
  dismiss: jest.fn(),
}));

describe('profile saga', () => {
  const error = new Error('error');

  it('should start fetching and navigate', () =>
    expectSaga(profileSaga)
      .provide([[matchers.call.fn(getRequest), []]])
      .dispatch(profileActions.profile(1))
      .put(profileActions.fetching())
      .silentRun());

  it('should put success when the request succeeds', () =>
    expectSaga(profileSaga)
      .provide([[matchers.call.like({ fn: getRequest, args: ['members/1'] }), 'data']])
      .dispatch(profileActions.profile(1))
      .put(profileActions.success('data'))
      .silentRun());

  it('should put failure when the request fails', () =>
    expectSaga(profileSaga)
      .provide([
        [
          matchers.call.like({ fn: getRequest, args: ['members/1'] }),
          throwError(error),
        ],
      ])
      .dispatch(profileActions.profile(1))
      .put(profileActions.failure())
      .silentRun());

  it('should do a GET request', () =>
    expectSaga(profileSaga)
      .dispatch(profileActions.profile(1))
      .call(getRequest, 'members/1')
      .silentRun());
});
