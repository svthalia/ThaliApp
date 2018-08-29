import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { Sentry } from 'react-native-sentry';
import { apiRequest, tokenSelector } from '../utils/url';

import * as pizzaActions from '../actions/pizza';
import * as navigationActions from '../actions/navigation';
import { PIZZA_SCENE } from '../ui/components/navigator/scenes';

const NOT_FOUND = 404;

const retrievePizzaInfo = function* retrievePizzaInfo() {
  const token = yield select(tokenSelector);

  yield put(pizzaActions.fetching());
  yield put(navigationActions.navigate(PIZZA_SCENE));

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
      const order = yield call(apiRequest, 'pizzas/orders/me', data);
      yield put(pizzaActions.success(event, order, pizzaList));
    } catch (error) {
      if (error.response !== null && error.response.status === NOT_FOUND) {
        yield put(pizzaActions.success(event, null, pizzaList));
      } else {
        Sentry.captureException(error);
        yield put(pizzaActions.failure());
      }
    }
  } catch (error) {
    if (error.response !== null && error.response.status === NOT_FOUND) {
      yield put(pizzaActions.success(null, null, []));
    } else {
      Sentry.captureException(error);
      yield put(pizzaActions.failure());
    }
  }
};

const cancel = function* cancel() {
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
    Sentry.captureException(error);
    yield put(pizzaActions.failure());
  }
};

const order = function* order(action) {
  const { pk, hasOrder } = action.payload;
  const token = yield select(tokenSelector);
  const data = {
    method: hasOrder ? 'PUT' : 'POST',
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
    Sentry.captureException(error);
    yield put(pizzaActions.failure());
  }
};

const pizzaSaga = function* pizzaSaga() {
  yield takeEvery(pizzaActions.PIZZA, retrievePizzaInfo);
  yield takeEvery(pizzaActions.CANCEL, cancel);
  yield takeEvery(pizzaActions.ORDER, order);
};

export default pizzaSaga;
