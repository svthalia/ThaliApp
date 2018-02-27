import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import AlbumsOverview from './AlbumsOverviewScreen';

const mapStateToProps = state => ({
  albums: state.photos.albums.data,
  status: state.photos.albums.status,
  fetching: state.photos.albums.fetching,
});

export default connect(mapStateToProps, () => ({}))(translate(['screens/photos/AlbumsOverview'])(AlbumsOverview));
