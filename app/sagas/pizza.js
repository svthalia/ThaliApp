import { call, put, takeEvery } from 'redux-saga/effects';

import * as pizzaActions from '../actions/pizza';
import reportError from '../utils/errorReporting';
import { deleteRequest, getRequest, patchRequest, postRequest } from './utils/api';

export const Payment = {
  NONE: 'no_payment',
  CARD: 'card_payment',
  CASH: 'cash_payment',
};

const NOT_FOUND = 404;

function* retrievePizzaInfo() {
  yield put(pizzaActions.fetching());

  try {
    const event = yield call(getRequest, 'pizzas/event');
    const pizzaList = yield call(getRequest, 'pizzas');
    try {
      const currentOrder = yield call(getRequest, 'pizzas/orders/me');
      yield put(pizzaActions.success(event, currentOrder, pizzaList));
    } catch (error) {
      if (error.response !== null && error.response.status === NOT_FOUND) {
        yield put(pizzaActions.success(event, null, pizzaList));
      } else {
        yield call(reportError, error);
        yield put(pizzaActions.failure());
      }
    }
  } catch (error) {
    if (error.response !== null && error.response.status === NOT_FOUND) {
      yield put(pizzaActions.success(null, null, []));
    } else {
      yield call(reportError, error);
      yield put(pizzaActions.failure());
    }
  }
}

function* cancel() {
  try {
    yield call(deleteRequest, 'pizzas/orders/me');
    yield put(pizzaActions.cancelSuccess());
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.failure());
  }
}

function* order(action) {
  const { pk, hasOrder } = action.payload;
  const data = {
    product: pk,
  };

  try {
    if (hasOrder) {
      const orderData = yield call(patchRequest, 'pizzas/orders/me', data);
      yield put(pizzaActions.orderSuccess(orderData));
    } else {
      const orderData = yield call(postRequest, 'pizzas/orders', data);
      yield put(pizzaActions.orderSuccess(orderData));
    }
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.failure());
  }
}

function* retrieveOrders() {
  yield put(pizzaActions.adminLoading());

  try {
    const orders = yield call(getRequest, 'pizzas/orders');
    yield put(pizzaActions.adminSuccess(orders));
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.adminFailure());
  }
}

function* updateOrder(action) {
  const { pk, payment } = action.payload;

  yield put(pizzaActions.adminLoading());

  try {
    yield call(patchRequest, `pizzas/orders/${pk}`, payment);
    yield put(pizzaActions.retrieveOrders());
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.adminFailure());
  }
}

export default function* pizzaSaga() {
  yield takeEvery(pizzaActions.PIZZA, retrievePizzaInfo);
  yield takeEvery(pizzaActions.CANCEL, cancel);
  yield takeEvery(pizzaActions.ORDER, order);
  yield takeEvery([pizzaActions.ADMIN, pizzaActions.ADMIN_ORDERS], retrieveOrders);
  yield takeEvery(pizzaActions.ADMIN_UPDATE_ORDER, updateOrder);
}
