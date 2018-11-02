import reducer from '../../app/reducers/members';
import * as actions from '../../app/actions/members';

describe('members reducer', () => {
  const emptyState = {};

  describe('initially', () => {
    const initialState = reducer();

    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is fetching', () => {
    const state = reducer(
      { loading: false },
      actions.fetching(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success([{ pk: 1 }], 'nextUrl', 'searchKey'),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have status success', () => {
      expect(state).toHaveProperty('status', 'success');
    });

    it('should have the member list result', () => {
      expect(state).toHaveProperty('memberList', [{ pk: 1 }]);
    });

    it('should have the url for more results', () => {
      expect(state).toHaveProperty('more', 'nextUrl');
    });

    it('should have the original search keys', () => {
      expect(state).toHaveProperty('searchKey', 'searchKey');
    });
  });

  describe('is failure', () => {
    const state = reducer(
      emptyState,
      actions.failure(),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have status failure', () => {
      expect(state).toHaveProperty('status', 'failure');
    });
  });

  describe('is successful with additional results', () => {
    let state = reducer(
      emptyState,
      actions.success([{ pk: 1 }], 'nextUrl', 'searchKey'),
    );

    state = reducer(
      state,
      actions.moreSuccess([{ pk: 2 }], 'nextUrl'),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have status success', () => {
      expect(state).toHaveProperty('status', 'success');
    });

    it('should have the combined member lists', () => {
      expect(state).toHaveProperty('memberList', [{ pk: 1 }, { pk: 2 }]);
    });

    it('should have the url for more results', () => {
      expect(state).toHaveProperty('more', 'nextUrl');
    });
  });
});
