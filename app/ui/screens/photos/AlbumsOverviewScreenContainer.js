import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import AlbumsOverview from './AlbumsOverviewScreen';

const mapStateToProps = state => ({
  albums: state.photos.albums.data,
  status: state.photos.albums.status,
  fetching: state.photos.albums.fetching,
});

export default connect(mapStateToProps, () => ({}))(withTranslation(['screens/photos/AlbumsOverview'])(AlbumsOverview));
