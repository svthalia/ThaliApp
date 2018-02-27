import React from 'react';
import renderer from 'react-test-renderer';
import AlbumListItem from '../../../../app/ui/screens/photos/AlbumListItem';

describe('AlbumListItem component', () => {
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
  const album = {
    pk: 1,
    title: 'Title',
    date: '01-01-2017',
    cover: photo,
  };

  it('renders correctly', () => {
    const tree = renderer
      .create(<AlbumListItem openAlbum={() => {}} album={album} size={20} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
