import reducer from '../../app/reducers/event';
import * as actions from '../../app/actions/event';

describe('events reducer', () => {
  const emptyState = {};
  const initialState = reducer();

  describe('initially', () => {
    it('should not be fetched', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is refreshing', () => {
    const state = reducer(
      emptyState,
      actions.fetching(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is opened', () => {
    const state = reducer(emptyState, actions.open());

    it('should reset', () => {
      expect(state).toEqual(initialState);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success({ pk: 1 }, [{ pk: 2 }]),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have event info', () => {
      expect(state).toHaveProperty('data', { pk: 1 });
    });

    it('should have registrations info', () => {
      expect(state).toHaveProperty('registrations', [{ pk: 2 }]);
    });

    it('should have status success', () => {
      expect(state).toHaveProperty('status', 'success');
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

  describe('is done', () => {
    const state = reducer(
      emptyState,
      actions.done(),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });
  });
});
