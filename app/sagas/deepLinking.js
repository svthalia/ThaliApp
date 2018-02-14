import { put, take, takeEvery, select } from 'redux-saga/effects';
import { url as siteURL, loggedInSelector } from '../url';

import * as deepLinkingActions from '../actions/deepLinking';
import * as pizzaActions from '../actions/pizza';
import * as loginActions from '../actions/login';
import * as eventActions from '../actions/event';
import * as navigationActions from '../actions/navigation';

export const parseURL = (url) => {
  const matches = new RegExp(`^${siteURL}(/[^?]+)(?:\\?(.+))?`).exec(url);

  if (!matches) {
    return {
      path: '',
      params: {},
    };
  }

  const path = matches[1];
  const params = {};
  if (matches[2]) {
    const pairs = matches[2].split('&');
    for (let i = 0; i < pairs.length; i += 1) {
      const pair = pairs[i].split('=');
      params[pair[0]] = pair[1];
    }
  }

  return { path, params };
};


const deepLink = function* deepLink(action) {
  const { url } = action.payload;

  if (!url) {
    return;
  }

  const { path } = parseURL(url);

  const loggedIn = yield select(loggedInSelector);
  if (!loggedIn) {
    yield take(loginActions.SUCCESS);
  }

  const patterns = [
    {
      regexp: new RegExp('^/pizzas/$'),
      action: pizzaActions.retrievePizzaInfo,
      args: [],
    },
    {
      regexp: new RegExp('^/events/([0-9]+)/$'),
      action: eventActions.event,
      args: [],
    },
    {
      regexp: new RegExp('^/events/$'),
      action: navigationActions.navigate,
      args: ['eventList'],
    },
  ];

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const matches = pattern.regexp.exec(path);
    if (matches) {
      yield put(pattern.action(...matches.slice(1), ...pattern.args));
      return;
    }
  }
};

const deepLinkingSaga = function* deepLinkingSaga() {
  yield takeEvery(deepLinkingActions.DEEPLINK, deepLink);
};

export default deepLinkingSaga;
