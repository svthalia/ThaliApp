import React from 'react';
import { Platform } from 'react-native';
import renderer from 'react-test-renderer';
import Button from '../../../../app/ui/components/button/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Button title="title" onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders disabled correctly', () => {
    const tree = renderer
      .create(<Button title="title" disabled onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders title correctly on Android', () => {
    Platform.OS = 'android';
    const tree = renderer
      .create(<Button title="title" onPress={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});