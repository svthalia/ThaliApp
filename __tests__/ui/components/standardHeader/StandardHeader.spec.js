import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import StandardHeader from '../../../../app/ui/components/standardHeader/StandardHeader';
import reducer from '../../../../app/reducers';
import { Platform } from 'react-native';

jest.mock('react-navigation', () => ({
  withNavigation: component => component,
}));

const mockNavigation = {
  state: 'mock',
};

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

  it('renders correctly on iOS', () => {
    Platform.OS = 'ios';
    const tree = renderer
      .create(<StandardHeader store={store} navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly on Android', () => {
    Platform.OS = 'android';
    const tree = renderer
      .create(<StandardHeader store={store} navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
