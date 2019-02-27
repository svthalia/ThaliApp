import React from 'react';
import renderer from 'react-test-renderer';
import MemberView from '../../../../app/ui/components/memberView/MemberView';

jest.mock('react-navigation', () => ({
  withNavigation: component => component,
}));

describe('MemberView component', () => {
  const initialState = {
    session: {
      token: 'token123',
    },
  };

  const member = {
    pk: 1,
    name: 'Lorem ipsum',
    photo: 'http://example.org/example.png',
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<MemberView store={initialState} member={member} size={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
