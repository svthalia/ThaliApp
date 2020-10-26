import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  ViewPropTypes,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Snackbar from 'react-native-snackbar';

import styles from './style/MemberView';
import SquareView from './SquareView';

const MemberView = (props) => (
  <SquareView style={props.style} size={props.size}>
    <TouchableHighlight
      style={styles.image}
      onPress={() => {
        if (props.member.pk) {
          props.loadProfile(props.member.pk);
        } else {
          Snackbar.show({ text: `${props.member.name} is not a member of Thalia` });
        }
      }}
    >
      <ImageBackground style={styles.image} source={{ uri: props.member.photo }}>
        <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
        <Text style={styles.nameText}>
          {props.member.name}
        </Text>
      </ImageBackground>
    </TouchableHighlight>
  </SquareView>
);

MemberView.propTypes = {
  member: PropTypes.shape({
    pk: PropTypes.number,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
  loadProfile: PropTypes.func.isRequired,
};

const defaultStyles = StyleSheet.create({
});

MemberView.defaultProps = {
  style: defaultStyles,
};

export default MemberView;
