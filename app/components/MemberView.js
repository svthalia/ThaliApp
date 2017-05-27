import React from 'react';
import { Image, Text, ViewPropTypes, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import styles from './style/memberView';
import SquareView from './SquareView';

const MemberView = props => (
  <SquareView style={props.style}>
    <Image style={styles.image} source={{ uri: props.member.photo }}>
      <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
      <Text style={styles.nameText}>{props.member.name}</Text>
    </Image>
  </SquareView>
  );

MemberView.propTypes = {
  member: React.PropTypes.shape({
    name: React.PropTypes.string,
    photo: React.PropTypes.string,
  }).isRequired,
  style: ViewPropTypes.style,
};

const defaultStyles = StyleSheet.create({
});

MemberView.defaultProps = {
  style: defaultStyles,
};

export default connect(() => ({}), () => ({}))(MemberView);
