import { View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './style/AlbumDetailScreen';
import IconButton from '../../components/button/IconButton';

const AlbumGalleryScreen = ({ photos, goBack, selection }) => (
  <View style={styles.screenWrapper}>
    <View style={styles.galleryWrapper}>
      <ImageViewer
        index={selection}
        imageUrls={photos}
      />
      <IconButton
        onPress={goBack}
        name="close"
        style={styles.closeGalleryTouchable}
        iconStyle={styles.icon}
      />
    </View>
  </View>
);

AlbumGalleryScreen.propTypes = {
  goBack: PropTypes.func.isRequired,
  selection: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  })).isRequired,
};

export default AlbumGalleryScreen;
