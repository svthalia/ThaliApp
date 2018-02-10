import reducer from '../../app/reducers/calendar';
import * as actions from '../../app/actions/calendar';

describe('calendar reducer', () => {
  const initial = reducer();

  describe('initially', () => {
    it('should not be fetched', () => {
      expect(initial).toMatchSnapshot();
    });
  });

  describe('is refreshing', () => {
    const state = reducer(
      { loading: false },
      actions.refresh(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      initial,
      actions.success([{ pk: 1 }]),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should have events', () => {
      expect(state).toHaveProperty('eventList', [{ pk: 1 }]);
    });

    it('should have status success', () => {
      expect(state).toHaveProperty('status', 'success');
    });
  });

  describe('is failure', () => {
    const state = reducer(
      initial,
      actions.failure(),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });

    it('should not have events', () => {
      expect(state).toHaveProperty('eventList', []);
    });

    it('should have status failure', () => {
      expect(state).toHaveProperty('status', 'failure');
    });
  });

});