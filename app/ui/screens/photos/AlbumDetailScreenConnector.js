import { connect } from 'react-redux';
import AlbumDetailScreen from './AlbumDetailScreen';
import * as photosActions from '../../../actions/photos';
import { albumData, albumStatus, isFetchingAlbum } from '../../../selectors/photos';

const mapStateToProps = (state) => ({
  photos: albumData(state).photos,
  status: albumStatus(state),
  fetching: isFetchingAlbum(state),
});

const mapDispatchToProps = {
  openGallery: photosActions.openGallery,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumDetailScreen);
