import { connect } from 'react-redux';
import AlbumListItem from './AlbumListItem';
import * as photosActions from '../../../actions/photos';
import { tokenSelector } from '../../../utils/url';

const mapStateToProps = state => ({
  albums: state.photos.albums.data,
  status: state.photos.albums.status,
  fetching: state.photos.albums.fetching,
  token: tokenSelector(state),
});

const mapDispatchToProps = dispatch => ({
  openAlbum: pk => dispatch(photosActions.openAlbum(pk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumListItem);
