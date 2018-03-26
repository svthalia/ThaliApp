import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import DismissKeyboardView from '../../../../app/ui/components/dismissKeyboardView/DismissKeyboardView';

describe('DismissKeyboardView component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<DismissKeyboardView><Text>Text</Text></DismissKeyboardView>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});