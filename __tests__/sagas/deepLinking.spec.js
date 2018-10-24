import { Linking } from 'react-native';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';

import deepLinkingSaga, { parseURL } from '../../app/sagas/deepLinking';
import { url as siteURL } from '../../app/utils/url';

import * as actions from '../../app/actions/deepLinking';
import * as sessionActions from '../../app/actions/session';
import * as pizzaActions from '../../app/actions/pizza';
import * as calendarActions from '../../app/actions/calendar';
import * as eventActions from '../../app/actions/event';

import { loggedInSelector } from '../../app/selectors/session';

jest.mock('../../app/navigation', () => ({
  navigate: jest.fn(),
}));

describe('deeplinking saga', () => {
  it('should parse a URL correctly', () => {
    const eventsUrl = parseURL(`${siteURL}/events/1`);
    expect(eventsUrl).toEqual({ params: {}, path: '/events/1' });
    const paramsUrl = parseURL(`${siteURL}/events?id=1`);
    expect(paramsUrl).toEqual({ params: { id: '1' }, path: '/events' });
    const emptyUrl = parseURL('http://example.org/');
    expect(emptyUrl).toEqual({ params: {}, path: '' });
  });

  it('should do nothing without a URL', () => expectSaga(deepLinkingSaga)
    .dispatch(actions.deepLink())
    .silentRun()
    .then(({ effects }) => {
      expect(effects.call).toBeUndefined();
      expect(effects.select).toBeUndefined();
      expect(effects.put).toBeUndefined();
    }));

  it('should wait for the user to be logged in', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), false],
    ])
    .dispatch(actions.deepLink('http://example.org/'))
    .take(sessionActions.SIGNED_IN)
    .silentRun());

  it('should not open an unknown url outside the app if stayInApp is true', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
    ])
    .dispatch(actions.deepLink('http://example.org/', true))
    .silentRun()
    .then(() => {
      expect(Linking.openURL).not.toBeCalled();
    }));

  it('should open an unknown url outside the app if specified', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
    ])
    .dispatch(actions.deepLink('http://example.org/', false))
    .silentRun()
    .then(() => {
      expect(Linking.openURL).toBeCalledWith('http://example.org/');
    }));

  it('should open the pizza url', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
    ])
    .dispatch(actions.deepLink(`${siteURL}/pizzas/`))
    .put(pizzaActions.retrievePizzaInfo())
    .silentRun());

  it('should open the events calendar url', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
    ])
    .dispatch(actions.deepLink(`${siteURL}/events/`))
    .put(calendarActions.open())
    .silentRun());

  it('should open an event detail', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
    ])
    .dispatch(actions.deepLink(`${siteURL}/events/1/`))
    .put(eventActions.event('1'))
    .silentRun());
});
