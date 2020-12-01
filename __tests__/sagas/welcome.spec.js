import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import * as welcomeActions from '../../app/actions/welcome';
import { getRequest } from '../../app/sagas/utils/api';
import welcomeSaga from '../../app/sagas/welcome';

describe('welcome saga', () => {
  const error = new Error('error');

  it('should put success when the request succeeds', () =>
    expectSaga(welcomeSaga)
      .provide([
        [matchers.call.like({ fn: getRequest, args: ['events'] }), { results: 'data' }],
      ])
      .dispatch(welcomeActions.refresh())
      .call(getRequest, 'events', { limit: 5, ordering: 'start' })
      .put(welcomeActions.success('data'))
      .silentRun());

  it('should put failure when the request fails', () =>
    expectSaga(welcomeSaga)
      .provide([
        [matchers.call.like({ fn: getRequest, args: ['events'] }), throwError(error)],
      ])
      .dispatch(welcomeActions.refresh())
      .call(getRequest, 'events', { limit: 5, ordering: 'start' })
      .put(welcomeActions.failure())
      .silentRun());
});
