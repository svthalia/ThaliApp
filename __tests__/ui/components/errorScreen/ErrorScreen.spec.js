import React from 'react';
import renderer from 'react-test-renderer';
import ErrorScreen from '../../../../app/ui/components/errorScreen/ErrorScreen';

describe('ErrorScreen component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<ErrorScreen message="Lorem ipsum" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
