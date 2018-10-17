import reducer from '../../app/reducers/pizza';
import * as actions from '../../app/actions/pizza';

describe('pizza reducer', () => {
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
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is successful', () => {
    const state = reducer(
      emptyState,
      actions.success(
        { title: 'pizzaEvent' },
        { pk: 1 },
        [{ pk: 2 }],
      ),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
      expect(state).toHaveProperty('hasLoaded', true);
    });

    it('should be successful', () => {
      expect(state).toHaveProperty('success', true);
    });

    it('should contain the pizza event info', () => {
      expect(state).toHaveProperty('event', { title: 'pizzaEvent' });
    });

    it('should contain the user\'s current order', () => {
      expect(state).toHaveProperty('order', { pk: 1 });
    });

    it('should contain the list of pizzas', () => {
      expect(state).toHaveProperty('pizzaList', [{ pk: 2 }]);
    });
  });

  describe('is failure', () => {
    const state = reducer(
      emptyState,
      actions.failure(),
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
      expect(state).toHaveProperty('hasLoaded', true);
    });

    it('should not be successful', () => {
      expect(state).toHaveProperty('success', false);
    });
  });

  describe('is cancelled successfully', () => {
    const state = reducer(
      emptyState,
      actions.cancelSuccess(),
    );

    it('should not contain an order', () => {
      expect(state).toHaveProperty('order', null);
    });
  });

  describe('is ordered successfully', () => {
    const state = reducer(
      emptyState,
      actions.orderSuccess({ pk: 1 }),
    );

    it('should contain the user\'s current order', () => {
      expect(state).toHaveProperty('order', { pk: 1 });
    });
  });
});
