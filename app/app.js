import React, { Component } from 'react';
import { BackAndroid, AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import ReduxNavigator from './components/navigator';
import { back } from './actions/navigation';
import { initLogin } from './actions/login';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (store.getState().navigation.previousScenes.length === 0) {
    return false;
  }
  store.dispatch(back());
  return true;
});

class Main extends Component {
  componentDidMount() {
    AsyncStorage.multiGet([USERNAMEKEY, TOKENKEY])
      .then(
        (result) => {
          // Transform [key, value] pairs into object, for easier access
          const values = result.reduce((obj, pair) => {
            const obj2 = { ...obj };
            obj2[pair[0]] = pair[1];
            return obj2;
          }, {});

          const username = values[USERNAMEKEY];
          const token = values[TOKENKEY];

          if (username !== null && token !== null) {
            store.dispatch(initLogin(username, token));
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
