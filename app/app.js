import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import ReduxNavigator from './components/navigator';
import { initLogin } from './actions/login';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const pairsToObject = (obj, pair) => {
  const obj2 = { ...obj };
  obj2[pair[0]] = pair[1];
  return obj2;
};

class Main extends Component {
  componentDidMount() {
    AsyncStorage.multiGet([USERNAMEKEY, TOKENKEY])
      .then(
        (result) => {
          const values = result.reduce(pairsToObject, {});
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
