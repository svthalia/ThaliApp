import * as matchers from 'redux-saga-test-plan/matchers';
import { select } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import deepLinkingSaga, { parseURL } from '../../app/sagas/deepLinking';
import * as deepLinkingActions from '../../app/actions/deepLinking';
import { url as siteURL, apiRequest, loggedInSelector } from '../../app/utils/url';
import * as navigationActions from '../../app/actions/navigation';
import * as eventActions from '../../app/actions/event';
import * as loginActions from '../../app/actions/session';
import * as pizzaActions from '../../app/actions/pizza';
import { EVENT_LIST_SCENE } from '../../app/ui/components/navigator/scenes';

describe('calendar saga', () => {
  it('should parse a URL correctly', () => {
    const eventsUrl = parseURL(`${siteURL}/events/1`);
    expect(eventsUrl).toEqual({ params: {}, path: '/events/1' });
    const paramsUrl = parseURL(`${siteURL}/events?id=1`);
    expect(paramsUrl).toEqual({ params: { id: '1' }, path: '/events' });
    const emptyUrl = parseURL('http://example.org/');
    expect(emptyUrl).toEqual({ params: {}, path: '' });
  });

  it('should not do anything when no url is provided', () => expectSaga(deepLinkingSaga)
    .dispatch(deepLinkingActions.deepLink(''))
    .not.put.like({ type: 'DEEPLINKING_DEEPLINK' })
    .silentRun());

  it('should wait for login before processing deeplink', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), false],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(deepLinkingActions.deepLink(`${siteURL}/events/1/`))
    .dispatch(loginActions.success('', ''))
    .put(eventActions.event('1'))
    .silentRun());

  it('should navigate to eventList on /events/ deeplink', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(deepLinkingActions.deepLink(`${siteURL}/events/`))
    .put(navigationActions.navigate(EVENT_LIST_SCENE))
    .silentRun());

  it('shouldl load event on /events/{id} deeplink', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(deepLinkingActions.deepLink(`${siteURL}/events/1/`))
    .put(eventActions.event('1'))
    .silentRun());

  it('should load pizzas on /pizzas/ deeplink', () => expectSaga(deepLinkingSaga)
    .provide([
      [select(loggedInSelector), true],
      [matchers.call.fn(apiRequest), []],
    ])
    .dispatch(deepLinkingActions.deepLink(`${siteURL}/pizzas/`))
    .put(pizzaActions.retrievePizzaInfo())
    .silentRun());
});
