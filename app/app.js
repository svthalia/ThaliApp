import React, { Component } from 'react';
import { Linking, Platform } from 'react-native';
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
import * as sessionActions from './actions/session';
import * as deepLinkingActions from './actions/deepLinking';
import { register } from './actions/pushNotifications';
import NavigationService from './navigation';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

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
    store.dispatch(sessionActions.init());
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
          <NavigationService.AppNavigator
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </Provider>
      </I18nextProvider>
    );
  }
}

export default Main;
