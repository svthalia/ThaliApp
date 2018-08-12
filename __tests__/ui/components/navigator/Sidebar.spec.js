import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Sidebar from '../../../../app/ui/components/sidebar/Sidebar';
import reducer from '../../../../app/reducers';

const mockNavigation = {
  navigate: jest.fn(),
};

describe('Sidebar component', () => {
  const mockStore = configureStore(reducer);
  const initialState = {
    navigation: {
      currentScene: 'home',
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
      .create(<Sidebar store={store} navigation={mockNavigation} activeItemKey="unknown" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});