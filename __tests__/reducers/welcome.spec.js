import reducer from '../../app/reducers/welcome';
import * as actions from '../../app/actions/welcome';

describe('welcome reducer', () => {
  const emptyState = {};

  describe('initially', () => {
    const initialState = reducer();

    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success([{ pk: 1 }]),
    );

    it('should be successful', () => {
      expect(state).toHaveProperty('status', 'success');
    });

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should contain the event list', () => {
      expect(state).toHaveProperty('eventList', [{ pk: 1 }]);
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

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });
  });

  describe('is refreshing', () => {
    const state = reducer(
      emptyState,
      actions.refresh(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });
});
