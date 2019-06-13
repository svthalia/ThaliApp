import { Dimensions } from 'react-native';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import membersSaga from '../../app/sagas/members';
import { tokenSelector } from '../../app/selectors/session';
import * as memberActions from '../../app/actions/members';
import { apiRequest } from '../../app/utils/url';

jest.mock('../../app/ui/components/standardHeader/style/StandardHeader', () => ({
  TOTAL_BAR_HEIGHT: 20,
}));

jest.mock('../../app/ui/screens/memberList/style/MemberList', () => ({
  memberSize: 24,
}));

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(),
}));

jest.mock('Dimensions', () => ({
  __esModule: true,
  get: () => ({
    height: 40 * 3 + 20,
  }),
}));

global.fetch = jest.fn();

describe('members saga', () => {
  describe('load members', () => {
    it('should indicate the member list is being loaded', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(memberActions.members())
      .put(memberActions.fetching())
      .silentRun());

    it('should load the member list without keywords', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(memberActions.members())
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('members', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token token',
          },
        }, {
          limit: 3 * 6,
        });
      }));

    it('should base the amount to fetch on the window height', () => {
      Dimensions.get = () => ({ height: 40 * 4 + 20 });
      expectSaga(membersSaga)
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .dispatch(memberActions.members())
        .silentRun()
        .then(() => {
          expect(apiRequest).toBeCalledWith('members', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Token token',
            },
          }, {
            limit: 4 * 6,
          });
        });
      Dimensions.get = () => ({ height: 40 * 3 + 20 });
    });

    it('should put the result data when the request succeeds', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['members'] }), { results: [{ pk: 1 }], next: 'moreUrl' }],
      ])
      .dispatch(memberActions.members())
      .put(memberActions.success([{ pk: 1 }], 'moreUrl', ''))
      .silentRun());

    it('should load the member list with keywords', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(memberActions.members('John Doe'))
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('members', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token token',
          },
        }, {
          limit: 3 * 6,
          search: 'John Doe',
        });
      }));

    it('should put the result data and keywords when the request succeeds', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['members'] }), { results: [{ pk: 1 }], next: 'moreUrl' }],
      ])
      .dispatch(memberActions.members('John Doe'))
      .put(memberActions.success([{ pk: 1 }], 'moreUrl', 'John Doe'))
      .silentRun());

    it('should put an error when the request fails', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.call(apiRequest, throwError)],
      ])
      .dispatch(memberActions.members())
      .put(memberActions.failure())
      .silentRun());
  });

  describe('load more members', () => {
    it('should indicate the member list is being loaded', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(memberActions.more('moreUrl'))
      .put(memberActions.fetching())
      .silentRun());

    it('should load more members', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['moreUrl'] }), { results: [{ pk: 1 }], next: 'moreUrl2' }],
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
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .dispatch(memberActions.more('moreUrl'))
        .put(memberActions.moreSuccess([{ pk: 1 }], 'evenMoreUrl'))
        .silentRun();
    });

    it('should put empty result data when the request fails', () => expectSaga(membersSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.call(fetch, throwError)],
      ])
      .dispatch(memberActions.more('moreUrl'))
      .put(memberActions.moreSuccess([], null))
      .silentRun());
  });
});
