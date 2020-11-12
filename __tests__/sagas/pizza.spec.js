import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '../../app/sagas/utils/api';
import pizzaSaga from '../../app/sagas/pizza';
import * as pizzaActions from '../../app/actions/pizza';

describe('pizza saga', () => {
  const error = new Error('error');
  error.response = null;

  describe('retrieve pizza info', () => {
    describe('failures', () => {
      beforeAll(() => {
        error.response = null;
      });

      it('should put failure when the pizza event request fails', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas/event'] }),
              throwError(error),
            ],
            [matchers.call.fn(getRequest), []],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.failure())
          .silentRun());

      it('should put failure when the pizzas request fails', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas'] }),
              throwError(error),
            ],
            [matchers.call.fn(getRequest), []],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.failure())
          .silentRun());

      it('should put failure when the order request fails', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({
                fn: getRequest,
                args: ['pizzas/orders/me'],
              }),
              throwError(error),
            ],
            [matchers.call.fn(getRequest), []],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.failure())
          .silentRun());
    });

    describe('successes', () => {
      beforeAll(() => {
        error.response = { status: 404 };
      });

      it('should put the result data when the requests all succeed', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas/event'] }),
              'pizzaEvent',
            ],
            [matchers.call.like({ fn: getRequest, args: ['pizzas'] }), 'pizzaList'],
            [
              matchers.call.like({
                fn: getRequest,
                args: ['pizzas/orders/me'],
              }),
              'pizzaOrder',
            ],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.success('pizzaEvent', 'pizzaOrder', 'pizzaList'))
          .silentRun());

      it('should put the result data when the order is not found', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas/event'] }),
              'pizzaEvent',
            ],
            [matchers.call.like({ fn: getRequest, args: ['pizzas'] }), 'pizzaList'],
            [
              matchers.call.like({
                fn: getRequest,
                args: ['pizzas/orders/me'],
              }),
              throwError(error),
            ],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.success('pizzaEvent', null, 'pizzaList'))
          .silentRun());

      it('should put the result data when the pizzas are not found', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas/event'] }),
              'pizzaEvent',
            ],
            [
              matchers.call.like({ fn: getRequest, args: ['pizzas'] }),
              throwError(error),
            ],
          ])
          .dispatch(pizzaActions.retrievePizzaInfo())
          .put(pizzaActions.success(null, null, []))
          .silentRun());
    });

    it('should do three GET requests', () =>
      expectSaga(pizzaSaga)
        .dispatch(pizzaActions.retrievePizzaInfo())
        .call(getRequest, 'pizzas/event')
        .call(getRequest, 'pizzas')
        .call(getRequest, 'pizzas/orders/me')
        .silentRun());
  });

  describe('cancel pizza order', () => {
    it('should put success when the request succeeds', () =>
      expectSaga(pizzaSaga)
        .provide([
          [
            matchers.call.like({ fn: deleteRequest, args: ['pizzas/orders/me'] }),
            'pizzaOrder',
          ],
        ])
        .dispatch(pizzaActions.cancelOrder())
        .put(pizzaActions.cancelSuccess())
        .silentRun());

    it('should put failure when the request fails', () =>
      expectSaga(pizzaSaga)
        .provide([
          [
            matchers.call.like({ fn: deleteRequest, args: ['pizzas/orders/me'] }),
            throwError(error),
          ],
        ])
        .dispatch(pizzaActions.cancelOrder())
        .put(pizzaActions.failure())
        .silentRun());

    it('should do a DELETE request', () =>
      expectSaga(pizzaSaga)
        .dispatch(pizzaActions.cancelOrder())
        .call(deleteRequest, 'pizzas/orders/me')
        .silentRun());
  });

  describe('create pizza order', () => {
    describe('order exists', () => {
      it('should put success when the request succeeds', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({
                fn: patchRequest,
                args: ['pizzas/orders/me'],
              }),
              'pizzaOrder',
            ],
          ])
          .dispatch(pizzaActions.orderPizza(1, true))
          .put(pizzaActions.orderSuccess('pizzaOrder'))
          .silentRun());

      it('should put failure when the request fails', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({
                fn: patchRequest,
                args: ['pizzas/orders/me'],
              }),
              throwError(error),
            ],
          ])
          .dispatch(pizzaActions.orderPizza(1, true))
          .put(pizzaActions.failure())
          .silentRun());

      it('should do a PUT request', () =>
        expectSaga(pizzaSaga)
          .dispatch(pizzaActions.orderPizza(1, true))
          .call(patchRequest, 'pizzas/orders/me', { product: 1 })
          .silentRun());
    });

    describe('new order', () => {
      it('should put success when the request succeeds', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: postRequest, args: ['pizzas/orders'] }),
              'pizzaOrder',
            ],
          ])
          .dispatch(pizzaActions.orderPizza(1, false))
          .put(pizzaActions.orderSuccess('pizzaOrder'))
          .silentRun());

      it('should put failure when the request fails', () =>
        expectSaga(pizzaSaga)
          .provide([
            [
              matchers.call.like({ fn: postRequest, args: ['pizzas/orders'] }),
              throwError(error),
            ],
          ])
          .dispatch(pizzaActions.orderPizza(1, false))
          .put(pizzaActions.failure())
          .silentRun());

      it('should do a POST request', () =>
        expectSaga(pizzaSaga)
          .dispatch(pizzaActions.orderPizza(2, false))
          .call(postRequest, 'pizzas/orders', { product: 2 })
          .silentRun());
    });
  });
});
