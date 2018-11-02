import reducer from '../../app/reducers/registration';
import * as actions from '../../app/actions/registration';

describe('registration reducer', () => {
  const initialState = reducer();
  const emptyState = {};

  describe('initially', () => {
    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is loading', () => {
    const state = reducer(
      emptyState,
      actions.loading(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('status', 'loading');
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success(),
    );

    it('should be successful', () => {
      expect(state).toHaveProperty('status', 'success');
    });
  });

  describe('is failure', () => {
    const state = reducer(
      emptyState,
      actions.failure(),
    );

    it('should be failure', () => {
      expect(state).toHaveProperty('status', 'failure');
    });
  });

  describe('is retrieving new fields', () => {
    const state = reducer(
      emptyState,
      actions.retrieveFields(1),
    );

    it('should reset the state', () => {
      expect(state).toEqual(initialState);
    });
  });

  describe('has retrieved new fields', () => {
    const state = reducer(
      emptyState,
      actions.showFields(1, { key: 'value' }),
    );

    it('should contain the registration id', () => {
      expect(state).toHaveProperty('registration', 1);
    });

    it('should contain the registration fields', () => {
      expect(state).toHaveProperty('fields', { key: 'value' });
    });

    it('should be successful', () => {
      expect(state).toHaveProperty('status', 'success');
    });
  });
});
