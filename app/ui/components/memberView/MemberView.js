import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  ViewPropTypes,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style/MemberView';
import SquareView from './SquareView';
import * as profileActions from '../../../actions/profile';

const MemberView = props => (
  <SquareView style={props.style} size={props.size}>
    <TouchableHighlight
      style={styles.image}
      onPress={() => props.loadProfile(props.member.pk)}
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
    pk: PropTypes.number.isRequired,
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

const mapDispatchToProps = dispatch => ({
  loadProfile: pk => dispatch(profileActions.profile(pk)),
});

export default connect(() => ({}), mapDispatchToProps)(MemberView);
