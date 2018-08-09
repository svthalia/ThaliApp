import React, { Component } from 'react';
import { AsyncStorage, Linking, Platform } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import createSagaMiddleware from 'redux-saga';
import FCM, { FCMEvent } from 'react-native-fcm';
import locale from 'react-native-locale-detector';
import Moment from 'moment';
import 'moment/locale/nl';

import reducers from './reducers';

import i18n from './utils/i18n';
import sagas from './sagas';
import ReduxNavigator from './ui/components/navigator/ReduxNavigator';
import * as loginActions from './actions/login';
import * as deepLinkingActions from './actions/deepLinking';
import { register } from './actions/pushNotifications';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';
const PUSHCATEGORYKEY = '@MyStore:pushCategories';

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

FCM.on(FCMEvent.RefreshToken, async () => {
  store.dispatch(register());
});

class Main extends Component {
  constructor() {
    super();
    if (locale.startsWith('nl')) {
      Moment.locale('nl');
    } else {
      Moment.locale('en');
    }
  }

  componentDidMount() {
    AsyncStorage.multiGet([USERNAMEKEY, TOKENKEY, DISPLAYNAMEKEY, PHOTOKEY, PUSHCATEGORYKEY])
      .then(
        (result) => {
          const values = result.reduce(pairsToObject, {});
          const username = values[USERNAMEKEY];
          const token = values[TOKENKEY];
          const displayName = values[DISPLAYNAMEKEY];
          const photo = values[PHOTOKEY];
          const pushCategories = JSON.parse(values[PUSHCATEGORYKEY]);

          if (username !== null && token !== null) {
            store.dispatch(loginActions.success(username, token));
            store.dispatch(loginActions.profileSuccess(displayName, photo));
            store.dispatch(loginActions.profile(token));
            store.dispatch(register(pushCategories));
          }
        },
      );

    this.addDeepLinkingHandler();
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  addDeepLinkingHandler = () => {
    if (Platform.OS === 'android') {
      Linking.getInitialURL().then((url) => {
        store.dispatch(deepLinkingActions.deepLink(url));
      });
    } else {
      Linking.addEventListener('url', this.handleOpenURL);
    }
  };

  handleOpenURL = (event) => {
    store.dispatch(deepLinkingActions.deepLink(event.url));
  };

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ReduxNavigator />
        </Provider>
      </I18nextProvider>
    );
  }
}

export default Main;
