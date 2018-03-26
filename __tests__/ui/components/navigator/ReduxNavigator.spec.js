import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import ReduxNavigator from '../../../../app/ui/components/navigator/ReduxNavigator';
import reducer from '../../../../app/reducers';

describe('ReduxNavigator component', () => {
  const mockStore = configureStore(reducer);
  const initialState = {
    navigation: {
      currentScene: 'home',
      previousScenes: [],
      drawerOpen: false,
    },
  };
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const tree = renderer
      .create(<Provider store={store}><ReduxNavigator /></Provider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});