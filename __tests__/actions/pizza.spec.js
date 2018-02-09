import * as actions from '../../app/actions/pizza';

describe('pizza actions', () => {
  it('should expose the pizza actions', () => {
    expect(actions.PIZZA).toEqual('PIZZA_PIZZALIST');
    expect(actions.FETCHING).toEqual('PIZZA_FETCHING');
    expect(actions.SUCCESS).toEqual('PIZZA_SUCCESS');
    expect(actions.FAILURE).toEqual('PIZZA_FAILURE');
    expect(actions.CANCEL).toEqual('PIZZA_CANCEL');
    expect(actions.CANCEL_SUCCESS).toEqual('PIZZA_CANCEL_SUCCESS');
    expect(actions.ORDER).toEqual('PIZZA_ORDER');
    expect(actions.ORDER_SUCCESS).toEqual('PIZZA_ORDER_SUCCESS');
  });

  it('should create an action to load the pizza list', () => {
    expect(actions.retrievePizzaInfo()).toMatchSnapshot();
  });

  it('should create an action for a successful pizza retrieval', () => {
    expect(actions.success('event', 'order', 'pizzaList')).toMatchSnapshot();
  });

  it('should create an action to announce the pizza fetching', () => {
    expect(actions.fetching()).toMatchSnapshot();
  });

  it('should create an action to announce the pizza failure', () => {
    expect(actions.failure()).toMatchSnapshot();
  });

  it('should create an action to cancel the pizza order', () => {
    expect(actions.cancelOrder()).toMatchSnapshot();
  });

  it('should create an action for a successful cancel the pizza order', () => {
    expect(actions.cancelSuccess()).toMatchSnapshot();
  });

  it('should create an action to create the pizza order', () => {
    expect(actions.orderPizza(1, true)).toMatchSnapshot();
    expect(actions.orderPizza(2, false)).toMatchSnapshot();
  });

  it('should create an action for a successful pizza order creation', () => {
    expect(actions.orderSuccess('order')).toMatchSnapshot();
  });
});