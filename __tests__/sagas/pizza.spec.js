import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { apiRequest, tokenSelector } from '../../app/utils/url';
import pizzaSaga from '../../app/sagas/pizza';
import * as pizzaActions from '../../app/actions/pizza';
import * as navigationActions from '../../app/actions/navigation';
import { PIZZA_SCENE } from '../../app/ui/components/navigator/scenes';

jest.mock('../../app/utils/url', () => ({
  apiRequest: jest.fn(() => {}),
  tokenSelector: () => 'token',
}));

describe('pizza saga', () => {
  const error = new Error('error');
  error.response = null;

  beforeEach(() => {
    apiRequest.mockReset();
  });

  describe('retrieve pizza info', () => {
    it('should start fetching and navigate on retrieve action', () => expectSaga(pizzaSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.fn(apiRequest), []],
      ])
      .dispatch(pizzaActions.retrievePizzaInfo())
      .put(pizzaActions.fetching())
      .put(navigationActions.navigate(PIZZA_SCENE))
      .silentRun());

    describe('failures', () => {
      beforeAll(() => {
        error.response = null;
      });

      it('should put failure when the pizza event request fails', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/event'] }), throwError(error)],
          [matchers.call.fn(apiRequest), []],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.failure())
        .silentRun());

      it('should put failure when the pizzas request fails', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas'] }), throwError(error)],
          [matchers.call.fn(apiRequest), []],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.failure())
        .silentRun());

      it('should put failure when the order request fails', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), throwError(error)],
          [matchers.call.fn(apiRequest), []],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.failure())
        .silentRun());
    });

    describe('successes', () => {
      beforeAll(() => {
        error.response = { status: 404 };
      });

      it('should put the result data when the requests all succeed', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/event'] }), 'pizzaEvent'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas'] }), 'pizzaList'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), 'pizzaOrder'],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.success('pizzaEvent', 'pizzaOrder', 'pizzaList'))
        .silentRun());

      it('should put the result data when the order is not found', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/event'] }), 'pizzaEvent'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas'] }), 'pizzaList'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), throwError(error)],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.success('pizzaEvent', null, 'pizzaList'))
        .silentRun());

      it('should put the result data when the pizzas are not found', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/event'] }), 'pizzaEvent'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas'] }), throwError(error)],
        ])
        .dispatch(pizzaActions.retrievePizzaInfo())
        .put(pizzaActions.success(null, null, []))
        .silentRun());
    });

    it('should do three GET requests', () => expectSaga(pizzaSaga)
      .provide([
        [select(tokenSelector), 'usertoken'],
      ])
      .dispatch(pizzaActions.retrievePizzaInfo())
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('pizzas/event', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token usertoken',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
        expect(apiRequest).toBeCalledWith('pizzas', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token usertoken',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
        expect(apiRequest).toBeCalledWith('pizzas/orders/me', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token usertoken',
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });
      }));
  });

  describe('cancel pizza order', () => {
    it('should put success when the request succeeds', () => expectSaga(pizzaSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), 'pizzaOrder'],
      ])
      .dispatch(pizzaActions.cancelOrder())
      .put(pizzaActions.cancelSuccess())
      .silentRun());

    it('should put failure when the request fails', () => expectSaga(pizzaSaga)
      .provide([
        [select(tokenSelector), 'token'],
        [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), throwError(error)],
      ])
      .dispatch(pizzaActions.cancelOrder())
      .put(pizzaActions.failure())
      .silentRun());

    it('should do a DELETE request', () => expectSaga(pizzaSaga)
      .provide([
        [select(tokenSelector), 'token'],
      ])
      .dispatch(pizzaActions.cancelOrder())
      .silentRun()
      .then(() => {
        expect(apiRequest).toBeCalledWith('pizzas/orders/me', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Token token',
            'Content-Type': 'application/json',
          },
          method: 'DELETE',
        });
      }));
  });

  describe('create pizza order', () => {
    describe('order exists', () => {
      it('should put success when the request succeeds', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), 'pizzaOrder'],
        ])
        .dispatch(pizzaActions.orderPizza(1, true))
        .put(pizzaActions.orderSuccess('pizzaOrder'))
        .silentRun());

      it('should put failure when the request fails', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders/me'] }), throwError(error)],
        ])
        .dispatch(pizzaActions.orderPizza(1, true))
        .put(pizzaActions.failure())
        .silentRun());

      it('should do a PUT request', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .dispatch(pizzaActions.orderPizza(1, true))
        .silentRun()
        .then(() => {
          expect(apiRequest).toBeCalledWith('pizzas/orders/me', {
            headers: {
              Accept: 'application/json',
              Authorization: 'Token token',
              'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: '{"product":1}',
          });
        }));
    });

    describe('new order', () => {
      it('should put success when the request succeeds', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders'] }), 'pizzaOrder'],
        ])
        .dispatch(pizzaActions.orderPizza(1, false))
        .put(pizzaActions.orderSuccess('pizzaOrder'))
        .silentRun());

      it('should put failure when the request fails', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
          [matchers.call.like({ fn: apiRequest, args: ['pizzas/orders'] }), throwError(error)],
        ])
        .dispatch(pizzaActions.orderPizza(1, false))
        .put(pizzaActions.failure())
        .silentRun());

      it('should do a POST request', () => expectSaga(pizzaSaga)
        .provide([
          [select(tokenSelector), 'token'],
        ])
        .dispatch(pizzaActions.orderPizza(2, false))
        .silentRun()
        .then(() => {
          expect(apiRequest).toBeCalledWith('pizzas/orders', {
            headers: {
              Accept: 'application/json',
              Authorization: 'Token token',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: '{"product":2}',
          });
        }));
    });
  });
});