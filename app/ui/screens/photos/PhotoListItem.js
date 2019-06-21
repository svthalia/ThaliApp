import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight, ViewPropTypes } from 'react-native';
import SquareView from '../../components/memberView/SquareView';
import styles from './style/PhotoListItem';

const PhotoListItem = props => (
  <SquareView style={props.style} size={props.size}>
    <TouchableHighlight
      style={styles.touchable}
      onPress={() => props.onPress()}
    >
      <Image
        source={{
          uri: props.photo.file.small,
        }}
        style={[
          styles.image,
          {
            width: props.size,
            height: props.size,
            transform: [{ rotate: `${props.photo.rotation}deg` }],
          },
        ]}
      />
    </TouchableHighlight>
  </SquareView>
);

PhotoListItem.propTypes = {
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
  onPress: PropTypes.func.isRequired,
};

PhotoListItem.defaultProps = {
  style: {},
};

export default PhotoListItem;
