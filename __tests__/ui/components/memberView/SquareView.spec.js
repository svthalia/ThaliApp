import React from 'react';
import { View } from 'react-native';
import renderer from 'react-test-renderer';
import SquareView from '../../../../app/ui/components/memberView/SquareView';

describe('SquareView component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<SquareView size={20}><View /></SquareView>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});