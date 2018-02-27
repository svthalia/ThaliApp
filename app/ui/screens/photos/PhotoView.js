import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight, ViewPropTypes } from 'react-native';
import SquareView from '../../components/memberView/SquareView';
import styles from './style/PhotoView';

const PhotoView = props => (
  <TouchableHighlight
    style={styles.touchable}
    onPress={() => props.onPress()}
  >
    <SquareView style={props.style} size={props.size} >
      <Image
        source={{
          uri: props.photo.file.small,
          headers: {
            Authorization: `Token ${props.token}`,
          },
        }}
        style={[styles.image, { width: props.size, height: props.size }]}
      />
    </SquareView>
  </TouchableHighlight>
);

PhotoView.propTypes = {
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  photo: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    rotation: PropTypes.number,
    hidden: PropTypes.bool,
    album: PropTypes.number,
    file: PropTypes.shape({
      full: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
    size: PropTypes.string,
  }).isRequired,
  token: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

PhotoView.defaultProps = {
  style: {},
};

export default PhotoView;
