import React, { Component } from 'react';
import { Alert, Linking, NativeModules, Platform } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import messaging from '@react-native-firebase/messaging';

import { select } from 'redux-saga/effects';
import reducers from './reducers';

import sagas from './sagas';
import * as sessionActions from './actions/session';
import * as deepLinkingActions from './actions/deepLinking';
import { register } from './actions/pushNotifications';
import Navigation from './ui/components/navigation/NavigationConnector';
import Colors from './ui/style/Colors';
import styles from './ui/screens/login/style/LoginScreen';
import Button from './ui/components/button/Button';
import { loggedInSelector } from './selectors/session';

const { UIManager } = NativeModules;

/* istanbul ignore next */
// eslint-disable-next-line no-unused-expressions
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);

class Main extends Component {
  componentDidMount() {
    store.dispatch(sessionActions.init());
    this.addDeepLinkingHandler();
    this.onTokenRefreshListener = messaging().onTokenRefresh(() => {
      store.dispatch(register());
    });
    this.notificationListener = messaging().onMessage(this.showNotification);
    this.notificationOpenedListener = messaging().onNotificationOpenedApp(
      this.handleOpenNotification
    );

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
    let buttons;
    if (notification.data.url) {
      buttons = [
        { text: 'Dismiss' },
        {
          text: 'Open',
          onPress: () =>
            store.dispatch(deepLinkingActions.deepLink(notification.data.url, false)),
        },
      ];
    } else {
      buttons = [{ text: 'OK' }];
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
      const { notification } = notificationOpen;
      if (notification.data.url) {
        store.dispatch(deepLinkingActions.deepLink(notification.data.url, false));
      } else {
        this.showNotification(notification);
      }
    }
  };

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

export default Main;
