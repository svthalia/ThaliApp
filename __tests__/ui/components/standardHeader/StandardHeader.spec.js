import React from 'react';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';
import StandardHeader from '../../../../app/ui/components/standardHeader/StandardHeader';

jest.mock('react-navigation', () => ({
  withNavigation: component => component,
}));

const mockNavigation = {
  state: 'mock',
};

describe('StandardHeader component', () => {
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

  it('renders correctly on iOS', () => {
    Platform.OS = 'ios';
    const tree = renderer
      .create(<StandardHeader store={initialState} navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly on Android', () => {
    Platform.OS = 'android';
    const tree = renderer
      .create(<StandardHeader store={initialState} navigation={mockNavigation} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
