import reducer from '../../app/reducers/calendar';
import * as actions from '../../app/actions/calendar';

describe('calendar reducer', () => {
  const emptyState = {};

  describe('initially', () => {
    const initialState = reducer();

    it('should not be fetched', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is refreshing', () => {
    const state = reducer(
      emptyState,
      actions.events(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success([{ pk: 1 }], 'keywords'),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have events', () => {
      expect(state).toHaveProperty('eventList', [{ pk: 1 }]);
    });

    it('should have keywords', () => {
      expect(state).toHaveProperty('keywords', 'keywords');
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
});
