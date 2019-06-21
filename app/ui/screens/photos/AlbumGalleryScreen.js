import { TouchableOpacity, View } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../style/Colors';
import styles from './style/AlbumDetailScreen';

const AlbumGalleryScreen = ({ photos, goBack, selection }) => (
  <View style={styles.screenWrapper}>
    <View style={styles.galleryWrapper}>
      <ImageViewer
        index={selection}
        imageUrls={photos}
      />
      <TouchableOpacity
        style={styles.closeGalleryTouchable}
        onPress={goBack}
      >
        <Icon
          name="close"
          style={styles.icon}
          size={24}
          color={Colors.white}
        />
      </TouchableOpacity>
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
