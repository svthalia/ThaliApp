import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground, Text, TouchableHighlight, View, ViewPropTypes,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment/moment';
import PhotoView from './PhotoView';
import styles from './style/AlbumListItem';
import SquareView from '../../components/memberView/SquareView';

const AlbumListItem = (props) => {
  const dateText = Moment(props.album.date).format('DD-MM-YY');

  return (
    <SquareView style={props.style} size={props.size}>
      <TouchableHighlight
        style={styles.image}
        onPress={() => props.openAlbum(props.album.pk)}
      >
        <ImageBackground
          style={styles.image}
          source={{
            uri: props.album.cover.file.small,
            headers: {
              Authorization: `Token ${props.token}`,
            },
          }}
        >
          <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
          <View style={styles.textWrapper}>
            <Text style={styles.titleText}>
              {props.album.title}
            </Text>
            <Text style={styles.dateText}>
              {dateText}
            </Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </SquareView>
  );
};

AlbumListItem.propTypes = {
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  album: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    shareable: PropTypes.bool.isRequired,
    accessible: PropTypes.bool.isRequired,
    hidden: PropTypes.bool.isRequired,
    cover: PropTypes.shape(PhotoView.propTypes.photo),
  }).isRequired,
  openAlbum: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

AlbumListItem.defaultProps = {
  style: {},
};

export default AlbumListItem;
