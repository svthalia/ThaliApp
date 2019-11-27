export const PIZZA = 'PIZZA_PIZZALIST';
export const FETCHING = 'PIZZA_FETCHING';
export const SUCCESS = 'PIZZA_SUCCESS';
export const FAILURE = 'PIZZA_FAILURE';
export const CANCEL = 'PIZZA_CANCEL';
export const CANCEL_SUCCESS = 'PIZZA_CANCEL_SUCCESS';
export const ORDER = 'PIZZA_ORDER';
export const ORDER_SUCCESS = 'PIZZA_ORDER_SUCCESS';
export const ADMIN = 'PIZZA_ADMIN';
export const ADMIN_ORDERS = 'PIZZA_ADMIN_ORDERS';
export const ADMIN_UPDATE_ORDER = 'PIZZA_ADMIN_UPDATE_ORDER';
export const ADMIN_LOADING = 'PIZZA_ADMIN_LOADING';
export const ADMIN_SUCCESS = 'PIZZA_ADMIN_SUCCESS';
export const ADMIN_FAILURE = 'PIZZA_ADMIN_FAILURE';

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

export function openAdmin() {
  return {
    type: ADMIN,
  };
}

export function retrieveOrders() {
  return {
    type: ADMIN_ORDERS,
  };
}

export function updateOrder(pk, payment) {
  return {
    type: ADMIN_UPDATE_ORDER,
    payload: { pk, payment },
  };
}

export function adminLoading() {
  return {
    type: ADMIN_LOADING,
  };
}

export function adminSuccess(orders) {
  return {
    type: ADMIN_SUCCESS,
    payload: { orders },
  };
}

export function adminFailure() {
  return {
    type: ADMIN_FAILURE,
  };
}
