import { connect } from 'react-redux';
import AlbumsOverview from './AlbumsOverviewScreen';
import {
  albumsData, albumsStatus, isFetchingAlbums, albumsKeywords, albumsNext,
} from '../../../selectors/photos';
import * as photosActions from '../../../actions/photos';

const mapStateToProps = (state) => ({
  albums: albumsData(state),
  keywords: albumsKeywords(state),
  status: albumsStatus(state),
  fetching: isFetchingAlbums(state),
  next: albumsNext(state),
});

const mapDispatchToProps = {
  openAlbum: photosActions.openAlbum,
  loadAlbums: photosActions.loadAlbums,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsOverview);
