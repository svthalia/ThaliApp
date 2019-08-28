import { TouchableOpacity, View, Platform } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Colors from '../../style/Colors';
import styles from './style/AlbumDetailScreen';
import IconButton from '../../components/button/IconButton';

class AlbumGalleryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { index: props.selection };
  }

  render() {
    const {
      photos, goBack, downloadPhoto, sharePhoto,
    } = this.props;

    const buttons = [
      <IconButton
        key="share-button"
        name="share"
        style={styles.sharePhotoTouchable}
        onPress={() => sharePhoto(photos[this.state.index].url)}
      />,
    ];

    if (Platform.OS === 'android') {
      buttons.push(
        <IconButton
          key="download-button"
          name="file-download"
          style={styles.downloadPhotoTouchable}
          onPress={() => downloadPhoto(photos[this.state.index].url)}
        />,
      );
    }

    return (
      <View style={styles.screenWrapper}>
        <View style={styles.galleryWrapper}>
          <ImageViewer
            index={this.state.index}
            imageUrls={photos}
            onChange={index => this.setState({ index })}
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
          {buttons}
        </View>
      </View>
    );
  }
}

AlbumGalleryScreen.propTypes = {
  goBack: PropTypes.func.isRequired,
  selection: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  })).isRequired,
  downloadPhoto: PropTypes.func.isRequired,
  sharePhoto: PropTypes.func.isRequired,
};

export default AlbumGalleryScreen;
