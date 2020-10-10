import React from 'react';
import renderer from 'react-test-renderer';
import Sidebar from '../../../../app/ui/components/sidebar/Sidebar';

jest.mock('react-native-vector-icons/MaterialIcons', () => ({
  Button: 'IconButton',
}));

jest.mock('@react-native-community/status-bar', () => 'StatusBar');

describe('Sidebar component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Sidebar
        activeItemKey="Welcome"
        photo="photo"
        displayName="Lorem ipsum"
        openCalendar={jest.fn()}
        openSettings={jest.fn()}
        openWelcome={jest.fn()}
        openMemberList={jest.fn()}
        loadProfile={jest.fn()}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
