export const PIZZA = 'PIZZA_PIZZALIST';
export const FETCHING = 'PIZZA_FETCHING';
export const SUCCESS = 'PIZZA_SUCCESS';
export const FAILURE = 'PIZZA_FAILURE';
export const CANCEL = 'PIZZA_CANCEL';
export const CANCEL_SUCCESS = 'PIZZA_CANCEL_SUCCESS';
export const ORDER = 'PIZZA_ORDER';
export const ORDER_SUCCESS = 'PIZZA_ORDER_SUCCESS';

export function retrievePizzaInfo() {
  return {
    type: PIZZA,
  };
}

export function success(event, order, pizzaList) {
  return {
    type: SUCCESS,
    payload: { event, order, pizzaList },
  };
}

export function fetching() {
  return {
    type: FETCHING,
  };
}

export function failure() {
  return {
    type: FAILURE,
  };
}

export function cancelOrder() {
  return {
    type: CANCEL,
  };
}

export function cancelSuccess() {
  return {
    type: CANCEL_SUCCESS,
  };
}

export function orderPizza(pk, hasOrder) {
  return {
    type: ORDER,
    payload: { pk, hasOrder },
  };
}

export function orderSuccess(order) {
  return {
    type: ORDER_SUCCESS,
    payload: { order },
  };
}
