import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import AlbumsOverview from './AlbumsOverviewScreen';
import { albumsData, albumsStatus, isFetchingAlbums } from '../../../selectors/photos';
import * as photosActions from '../../../actions/photos';

const mapStateToProps = state => ({
  albums: albumsData(state),
  status: albumsStatus(state),
  fetching: isFetchingAlbums(state),
});

const mapDispatchToProps = {
  openAlbum: photosActions.openAlbum,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['screens/photos/AlbumsOverview'])(AlbumsOverview));
