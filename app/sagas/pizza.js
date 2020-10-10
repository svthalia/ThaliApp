import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';
import { apiRequest } from '../utils/url';

import * as pizzaActions from '../actions/pizza';
import { tokenSelector } from '../selectors/session';
import reportError from '../utils/errorReporting';

export const Payment = {
  NONE: 'no_payment',
  CARD: 'card_payment',
  CASH: 'cash_payment',
};

const NOT_FOUND = 404;

function* retrievePizzaInfo() {
  const token = yield select(tokenSelector);

  yield put(pizzaActions.fetching());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const event = yield call(apiRequest, 'pizzas/event', data);
    const pizzaList = yield call(apiRequest, 'pizzas', data);
    try {
      const currentOrder = yield call(apiRequest, 'pizzas/orders/me', data);
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
  const token = yield select(tokenSelector);
  const data = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    yield call(apiRequest, 'pizzas/orders/me', data);
    yield put(pizzaActions.cancelSuccess());
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.failure());
  }
}

function* order(action) {
  const { pk, hasOrder } = action.payload;
  const token = yield select(tokenSelector);
  const data = {
    method: hasOrder ? 'PATCH' : 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      product: pk,
    }),
  };

  const route = hasOrder ? 'pizzas/orders/me' : 'pizzas/orders';
  try {
    const orderData = yield call(apiRequest, route, data);
    yield put(pizzaActions.orderSuccess(orderData));
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.failure());
  }
}

function* retrieveOrders() {
  const token = yield select(tokenSelector);

  yield put(pizzaActions.adminLoading());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const orders = yield call(apiRequest, 'pizzas/orders', data);
    yield put(pizzaActions.adminSuccess(orders));
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.adminFailure());
  }
}

function* updateOrder(action) {
  const { pk, payment } = action.payload;

  const token = yield select(tokenSelector);

  yield put(pizzaActions.adminLoading());

  const data = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({
      payment,
    }),
  };

  try {
    yield call(apiRequest, `pizzas/orders/${pk}`, data);
    yield put(pizzaActions.retrieveOrders());
  } catch (error) {
    yield call(reportError, error);
    yield put(pizzaActions.adminFailure());
  }
}

export default function* () {
  yield takeEvery(pizzaActions.PIZZA, retrievePizzaInfo);
  yield takeEvery(pizzaActions.CANCEL, cancel);
  yield takeEvery(pizzaActions.ORDER, order);
  yield takeEvery([pizzaActions.ADMIN, pizzaActions.ADMIN_ORDERS], retrieveOrders);
  yield takeEvery(pizzaActions.ADMIN_UPDATE_ORDER, updateOrder);
}
