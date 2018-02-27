import React from 'react';
import renderer from 'react-test-renderer';
import PhotoView from '../../../../app/ui/screens/photos/PhotoView';

describe('PhotoView component', () => {
  const photo = {
    file: {
      small: 'http://test.local/small.png',
      medium: 'http://test.local/medium.png',
      large: 'http://test.local/large.png',
      full: 'http://test.local/full.png',
    },
    album: 0,
    pk: 0,
    size: 10,
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<PhotoView onPress={() => {}} photo={photo} size={20} token="token" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
