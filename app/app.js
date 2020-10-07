import React, { Component } from 'react';
import {
  Alert, Linking, NativeModules, Platform,
} from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import createSagaMiddleware from 'redux-saga';
import messaging from '@react-native-firebase/messaging';
import { getLocales } from 'react-native-localize';
import Moment from 'moment';
import 'moment/locale/nl';

import { i18n as i18next } from 'i18next';
import reducers from './reducers';

import i18n from './utils/i18n';
import sagas from './sagas';
import * as sessionActions from './actions/session';
import * as deepLinkingActions from './actions/deepLinking';
import { register } from './actions/pushNotifications';
import NavigationService from './navigation';

const { UIManager } = NativeModules;

/* istanbul ignore next */
// eslint-disable-next-line no-unused-expressions
UIManager.setLayoutAnimationEnabledExperimental
&& UIManager.setLayoutAnimationEnabledExperimental(true);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

class Main extends Component {
  constructor() {
    super();
    if (getLocales()[0].languageCode.startsWith('nl')) {
      Moment.locale('nl');
    } else {
      Moment.locale('en');
    }
  }

  componentDidMount() {
    store.dispatch(sessionActions.init());
    this.addDeepLinkingHandler();
    this.onTokenRefreshListener = messaging().onTokenRefresh(() => {
      store.dispatch(register());
    });
    this.notificationListener = messaging().onMessage(this.showNotification);
    this.notificationOpenedListener = messaging()
      .onNotificationOpenedApp(this.handleOpenNotification);

    messaging().getInitialNotification().then(this.handleOpenNotification);
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
    this.onTokenRefreshListener();
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

  showNotification = (notification) => {
    const t = i18next.getFixedT(undefined, 'app');
    let buttons;
    if (notification.data.url) {
      buttons = [
        { text: t('Dismiss') },
        {
          text: t('Open'),
          onPress: () => store.dispatch(
            deepLinkingActions.deepLink(notification.data.url, false),
          ),
        },
      ];
    } else {
      buttons = [
        { text: 'OK' },
      ];
    }

    if (notification.body !== undefined) {
      Alert.alert(notification.title, notification.body, buttons);
    } else if (notification.data.body !== undefined) {
      Alert.alert(notification.data.title, notification.data.body, buttons);
    }
  };

  handleOpenURL = (event) => {
    store.dispatch(deepLinkingActions.deepLink(event.url));
  };

  handleOpenNotification = (notificationOpen) => {
    if (notificationOpen) {
      const notification = notificationOpen.notification;
      if (notification.data.url) {
        store.dispatch(deepLinkingActions.deepLink(notification.data.url, false));
      } else {
        this.showNotification(notification);
      }
    }
  };

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <NavigationService.AppContainer
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
