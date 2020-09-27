import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import AlbumGalleryScreen from './AlbumGalleryScreen';
import * as navigationActions from '../../../actions/navigation';
import * as photosActions from '../../../actions/photos';
import { albumData, albumSelection } from '../../../selectors/photos';

const mapStateToProps = (state) => ({
  photos: Object.values(albumData(state).photos)
    .filter((photo) => !photo.hidden)
    .map((photo) => ({
      url: photo.file.large,
    })),
  selection: albumSelection(state),
});

const mapDispatchToProps = {
  goBack: navigationActions.goBack,
  downloadPhoto: photosActions.downloadPhoto,
  sharePhoto: photosActions.sharePhoto,
};

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation(['screens/photos/AlbumDetail'])(AlbumGalleryScreen));
