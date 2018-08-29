import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store'
import MemberView from '../../../../app/ui/components/memberView/MemberView';
import reducer from '../../../../app/reducers/index';

jest.mock('react-navigation', () => ({
  withNavigation: component => component,
}));

describe('MemberView component', () => {
  const mockStore = configureStore(reducer);
  const initialState = {
    session: {
      token: 'token123',
    },
  };
  const store = mockStore(initialState);

  const member = {
    pk: 1,
    name: 'Lorem ipsum',
    photo: 'http://example.org/example.png',
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemberView store={store} member={member} size={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});