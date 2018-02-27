import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import AlbumDetailScreen from './AlbumDetailScreen';
import { tokenSelector } from '../../../utils/url';

const mapStateToProps = state => ({
  photos: state.photos.album.data.photos,
  status: state.photos.album.status,
  fetching: state.photos.album.fetching,
  token: tokenSelector(state),
});

export default connect(mapStateToProps)(translate(['screens/photos/AlbumDetail'])(AlbumDetailScreen));
