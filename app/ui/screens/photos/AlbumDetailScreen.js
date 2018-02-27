import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, TouchableOpacity, View } from 'react-native';
import Gallery from 'react-native-image-gallery';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { STATUS_FAILURE, STATUS_INITIAL } from '../../../reducers/photos';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import styles from './style/AlbumDetail';
import PhotoView from './PhotoView';
import PhotoViewContainer from './PhotoViewContainer';
import Colors from '../../style/Colors';
import StandardHeader from '../../components/standardHeader/StandardHeader';

const windowWidth = Dimensions.get('window').width;
export const itemSize = (windowWidth - 48) / 3;

class AlbumDetailScreen extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const { token, photos } = nextProps;
    const gallerySources = [];
    if (photos && photos.length > 0) {
      const keys = Object.keys(photos);
      for (let i = 0; i < keys.length; i += 1) {
        const photo = photos[i];
        gallerySources.push({
          source: {
            uri: photo.file.large,
            headers: {
              Authorization: `Token ${token}`,
            },
          },
          dimensions: {
            height: 1080,
            width: 1920,
          },
        });
      }
    }

    return {
      ...prevState,
      gallery: gallerySources,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      gallery: [],
      selection: null,
    };
  }

  openGallery(index) {
    this.setState({ selection: index });
  }

  closeGallery() {
    this.setState({ selection: null });
  }

  render() {
    const { t, fetching, status, photos } = this.props;

    let content = (
      <View style={styles.wrapper}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.listContainer}
          data={photos}
          renderItem={
            data => (
              <PhotoViewContainer
                photo={data.item}
                size={itemSize}
                style={styles.listItem}
                onPress={() => this.openGallery(data.index)}
              />
            )
          }
          keyExtractor={item => item.pk}
          numColumns={3}
        />
      </View>
    );

    if (fetching && status === STATUS_INITIAL) {
      content = (<LoadingScreen />);
    } else if (!fetching && status === STATUS_FAILURE) {
      content = (
        <View style={styles.wrapper}>
          <ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />
        </View>
      );
    } else if (this.state.selection !== null) {
      return (
        <View style={styles.screenWrapper}>
          <View style={styles.galleryWrapper}>
            <Gallery
              initialPage={this.state.selection}
              style={styles.gallery}
              images={this.state.gallery}
              flatListProps={{
                initialNumToRender: 20,
                initialScrollIndex: this.state.selection,
                getItemLayout: (data, index) => ({
                  length: Dimensions.get('screen').width,
                  offset: Dimensions.get('screen').width * index,
                  index,
                }),
              }}
            />
            <TouchableOpacity
              style={styles.closeGalleryTouchable}
              onPress={() => this.closeGallery()}
            >
              <Icon
                name={'close'}
                style={styles.icon}
                size={24}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.screenWrapper}>
        <StandardHeader />
        {content}
      </View>
    );
  }
}

AlbumDetailScreen.propTypes = {
  fetching: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PhotoView.propTypes.photo),
  // eslint-disable-next-line react/no-unused-prop-types
  token: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

AlbumDetailScreen.defaultProps = {
  photos: [],
};

export default AlbumDetailScreen;
