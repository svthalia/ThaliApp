import reducer from '../../app/reducers/profile';
import * as actions from '../../app/actions/profile';

describe('profile reducer', () => {
  const emptyState = {};

  describe('initially', () => {
    const initialState = reducer();

    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is fetching', () => {
    const state = reducer(
      emptyState,
      actions.fetching(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('hasLoaded', false);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success({ pk: 1 }),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('hasLoaded', true);
    });

    it('should be successful', () => {
      expect(state).toHaveProperty('success', true);
    });

    it('should contain the profile data', () => {
      expect(state).toHaveProperty('profile', { pk: 1 });
    });
  });

  describe('is failure', () => {
    const state = reducer(
      emptyState,
      actions.failure(),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('hasLoaded', true);
    });

    it('should not be successful', () => {
      expect(state).toHaveProperty('success', false);
    });
  });
});
