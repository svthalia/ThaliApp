import React from 'react';
import renderer from 'react-test-renderer';
import StandardHeader from '../../../../app/ui/components/standardHeader/StandardHeader';
import reducer from '../../../../app/reducers';
import configureStore from 'redux-mock-store';

describe('StandardHeader component', () => {
  const mockStore = configureStore(reducer);
  const initialState = {
    navigation: {
      currentScene: 'home',
      previousScenes: [],
      loggedIn: false,
      drawerOpen: false,
    },
    session: {
      displayName: 'Lorem ipsum',
      photo: 'photo',
      token: 'token123',
    },
  };
  const store = mockStore(initialState);

  it('renders correctly', () => {
    const tree = renderer
      .create(<StandardHeader store={store} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
