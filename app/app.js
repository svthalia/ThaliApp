import React from 'react';
import { BackAndroid } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './reducers';
import ReduxNavigator from './components/navigator';
import { back } from './actions/navigation';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (store.getState().navigation.previousScenes.length === 0) {
    return false;
  }
  store.dispatch(back());
  return true;
});

const Main = () =>
  <Provider store={store}>
    <ReduxNavigator />
  </Provider>
;

export default Main;
