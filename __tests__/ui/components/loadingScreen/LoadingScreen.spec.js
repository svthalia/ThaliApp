import React from 'react';
import renderer from 'react-test-renderer';
import LoadingScreen from '../../../../app/ui/components/loadingScreen/LoadingScreen';

describe('LoadingScreen component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<LoadingScreen />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});