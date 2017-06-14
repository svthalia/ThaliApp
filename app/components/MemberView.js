import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, ViewPropTypes, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { url } from '../url';
import styles from './style/memberView';
import SquareView from './SquareView';

const MemberView = (props) => {
  let photo = props.member.photo;
  const regex = new RegExp(`^(${url}/media/public)/(avatars/[^\\.]+)\\.(jpg|jpeg)`);
  const matches = regex.exec(photo);

  if (matches) {
    photo = `${matches[1]}/thumbnails/220x220_1/${matches[2]}.${matches[3]}`;
  }

  return (
    <SquareView style={props.style}>
      <Image style={styles.image} source={{ uri: photo }}>
        <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
        <Text style={styles.nameText}>{props.member.name}</Text>
      </Image>
    </SquareView>
  );
};

MemberView.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
  }).isRequired,
  style: ViewPropTypes.style,
};

const defaultStyles = StyleSheet.create({
});

MemberView.defaultProps = {
  style: defaultStyles,
};

export default connect(() => ({}), () => ({}))(MemberView);
