import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import FCM, { FCMEvent } from 'react-native-fcm';
import Moment from 'moment';
import 'moment/locale/nl';

import * as reducers from './reducers';
import sagas from './sagas';
import ReduxNavigator from './components/navigator';
import * as loginActions from './actions/login';
import { register } from './actions/pushNotifications';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer, applyMiddleware(thunk, sagaMiddleware));
sagaMiddleware.run(sagas);

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';

const pairsToObject = (obj, pair) => {
  const obj2 = { ...obj };
  obj2[pair[0]] = pair[1];
  return obj2;
};

FCM.on(FCMEvent.Notification, async (notif) => {
  if (notif.fcm) {
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      color: notif.fcm.color,
      icon: notif.fcm.icon === null ? 'ic_notification' : notif.fcm.icon,
      action: notif.fcm.action,
      tag: notif.fcm.tag,
      show_in_foreground: true,
    });
  }
});

class Main extends Component {
  componentDidMount() {
    Moment.locale('nl');
    AsyncStorage.multiGet([USERNAMEKEY, TOKENKEY, DISPLAYNAMEKEY, PHOTOKEY])
      .then(
        (result) => {
          const values = result.reduce(pairsToObject, {});
          const username = values[USERNAMEKEY];
          const token = values[TOKENKEY];
          const displayName = values[DISPLAYNAMEKEY];
          const photo = values[PHOTOKEY];

          if (username !== null && token !== null) {
            store.dispatch(loginActions.success(username, token, displayName, photo, ''));
            store.dispatch(register(token));
          }
        });
  }

  render() {
    return (
      <Provider store={store}>
        <ReduxNavigator />
      </Provider>
    );
  }
}

export default Main;
