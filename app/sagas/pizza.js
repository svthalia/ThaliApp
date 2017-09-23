import { call, takeEvery, put } from 'redux-saga/effects';
import { apiRequest } from '../url';

import * as pizzaActions from '../actions/pizza';
import * as navigationActions from '../actions/navigation';

const NOT_FOUND = 404;

const retrievePizzaInfo = function* retrievePizzaInfo(action) {
  const { token } = action.payload;

  yield put(pizzaActions.fetching());
  yield put(navigationActions.navigate('pizza'));

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    let response = yield call(apiRequest, 'pizzas/event', data);
    const event = response.content;

    if (response.status === NOT_FOUND) {
      yield put(pizzaActions.success(null, null, []));
    } else if (!response.success) {
      throw Error();
    } else {
      response = yield call(apiRequest, 'pizzas', data);
      const pizzaList = response.content;
      if (!response.success) {
        throw Error();
      }

      response = yield call(apiRequest, 'pizzas/orders/me', data);
      const order = response.content;
      if (response.status === NOT_FOUND) {
        yield put(pizzaActions.success(event, null, pizzaList));
      } else if (!response.success) {
        yield put(pizzaActions.failure());
      } else {
        yield put(pizzaActions.success(event, order, pizzaList));
      }
    }
  } catch (error) {
    yield put(pizzaActions.failure());
  }
};

const cancel = function* cancel(action) {
  const { token } = action.payload;
  const data = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const response = yield call(apiRequest, 'pizzas/orders/me', data);
    if (response.success) {
      yield put(pizzaActions.cancelSuccess());
    } else {
      yield put(pizzaActions.failure());
    }
  } catch (error) {
    yield put(pizzaActions.failure());
  }
};

const order = function* order(action) {
  const { token, pk, hasOrder } = action.payload;
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
    const response = yield call(apiRequest, route, data);
    if (response.success) {
      yield put(pizzaActions.orderSuccess(response.content));
    } else {
      yield put(pizzaActions.failure());
    }
  } catch (error) {
    yield put(pizzaActions.failure());
  }
};

const pizzaSaga = function* pizzaSaga() {
  yield takeEvery(pizzaActions.PIZZA, retrievePizzaInfo);
  yield takeEvery(pizzaActions.CANCEL, cancel);
  yield takeEvery(pizzaActions.ORDER, order);
};

export default pizzaSaga;
