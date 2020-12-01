import { Dimensions } from 'react-native';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import membersSaga from '../../app/sagas/members';
import * as memberActions from '../../app/actions/members';
import { getRequest } from '../../app/sagas/utils/api';

jest.mock('../../app/ui/components/standardHeader/style/StandardHeader', () => ({
  TOTAL_BAR_HEIGHT: 20,
}));

jest.mock('../../app/ui/screens/memberList/style/MemberList', () => ({
  memberSize: 24,
}));

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  __esModule: true,
  get: () => ({
    height: 40 * 3 + 20,
  }),
}));

global.fetch = jest.fn();

describe('members saga', () => {
  describe('load members', () => {
    it('should indicate the member list is being loaded', () =>
      expectSaga(membersSaga)
        .dispatch(memberActions.members())
        .put(memberActions.fetching())
        .silentRun());

    it('should load the member list without keywords', () =>
      expectSaga(membersSaga)
        .dispatch(memberActions.members())
        .call(getRequest, 'members', {
          limit: 3 * 6,
        })
        .silentRun());

    it('should base the amount to fetch on the window height', () => {
      Dimensions.get = () => ({ height: 40 * 4 + 20 });
      expectSaga(membersSaga)
        .dispatch(memberActions.members())
        .call(getRequest, 'members', {
          limit: 4 * 6,
        })
        .silentRun();
      Dimensions.get = () => ({ height: 40 * 3 + 20 });
    });

    it('should put the result data when the request succeeds', () =>
      expectSaga(membersSaga)
        .provide([
          [
            matchers.call.like({ fn: getRequest, args: ['members'] }),
            { results: [{ pk: 1 }], next: 'moreUrl' },
          ],
        ])
        .dispatch(memberActions.members())
        .put(memberActions.success([{ pk: 1 }], 'moreUrl', ''))
        .silentRun());

    it('should load the member list with keywords', () =>
      expectSaga(membersSaga)
        .dispatch(memberActions.members('John Doe'))
        .call(getRequest, 'members', {
          limit: 3 * 6,
          search: 'John Doe',
        })
        .silentRun());

    it('should put the result data and keywords when the request succeeds', () =>
      expectSaga(membersSaga)
        .provide([
          [
            matchers.call.like({ fn: getRequest, args: ['members'] }),
            { results: [{ pk: 1 }], next: 'moreUrl' },
          ],
        ])
        .dispatch(memberActions.members('John Doe'))
        .put(memberActions.success([{ pk: 1 }], 'moreUrl', 'John Doe'))
        .silentRun());

    it('should put an error when the request fails', () =>
      expectSaga(membersSaga)
        .provide([[matchers.call.call(getRequest, throwError)]])
        .dispatch(memberActions.members())
        .put(memberActions.failure())
        .silentRun());
  });

  describe('load more members', () => {
    it('should indicate the member list is being loaded', () =>
      expectSaga(membersSaga)
        .dispatch(memberActions.more('moreUrl'))
        .put(memberActions.fetching())
        .silentRun());

    it('should load more members', () =>
      expectSaga(membersSaga)
        .provide([
          [
            matchers.call.like({ fn: getRequest, args: ['moreUrl'] }),
            { results: [{ pk: 1 }], next: 'moreUrl2' },
          ],
        ])
        .dispatch(memberActions.more('moreUrl'))
        .put(memberActions.moreSuccess([{ pk: 1 }], 'moreUrl2'))
        .silentRun());

    it('should put the result data when the request succeeds', () => {
      const response = {
        json: Promise.resolve({
          results: [{ pk: 1 }],
          next: 'evenMoreUrl',
        }),
      };
      global.fetch.mockReturnValueOnce(Promise.resolve(response));

      expectSaga(membersSaga)
        .dispatch(memberActions.more('moreUrl'))
        .put(memberActions.moreSuccess([{ pk: 1 }], 'evenMoreUrl'))
        .silentRun();
    });

    it('should put empty result data when the request fails', () =>
      expectSaga(membersSaga)
        .provide([[matchers.call.call(fetch, throwError)]])
        .dispatch(memberActions.more('moreUrl'))
        .put(memberActions.moreSuccess([], null))
        .silentRun());
  });
});
