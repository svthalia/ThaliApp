import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Moment from 'moment';
import 'moment/locale/nl';

import * as reducers from './reducers';
import ReduxNavigator from './components/navigator';
import { loginSuccess } from './actions/login';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

const USERNAMEKEY = '@MyStore:username';
const TOKENKEY = '@MyStore:token';
const DISPLAYNAMEKEY = '@MyStore:displayName';
const PHOTOKEY = '@MyStore:photo';

const pairsToObject = (obj, pair) => {
  const obj2 = { ...obj };
  obj2[pair[0]] = pair[1];
  return obj2;
};

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
            store.dispatch(loginSuccess(username, token, displayName, photo));
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
