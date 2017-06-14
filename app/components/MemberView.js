import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text, ViewPropTypes, StyleSheet, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';

import { url } from '../url';
import styles from './style/memberView';
import SquareView from './SquareView';
import { loadProfile } from '../actions/profile';

const regex = new RegExp(`^(${url}/media/public)/(avatars/[^\\.]+)\\.(jpg|jpeg|png|gif)`);

const MemberView = (props) => {
  let photo = props.member.photo;
  const matches = regex.exec(photo);

  if (matches) {
    photo = `${matches[1]}/thumbnails/220x220_1/${matches[2]}.${matches[3]}`;
  }

  return (
    <SquareView style={props.style}>
      <TouchableHighlight
        style={styles.image}
        onPress={() => props.loadProfile(props.token, props.member.member)}
      >
        <Image style={styles.image} source={{ uri: photo }}>
          <LinearGradient colors={['#55000000', '#000000']} style={styles.overlayGradient} />
          <Text style={styles.nameText}>{props.member.name}</Text>
        </Image>
      </TouchableHighlight>
    </SquareView>
  );
};

MemberView.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string,
    photo: PropTypes.string,
    member: PropTypes.number,
  }).isRequired,
  style: ViewPropTypes.style,
  token: PropTypes.string.isRequired,
  loadProfile: PropTypes.func.isRequired,
};

const defaultStyles = StyleSheet.create({
});

MemberView.defaultProps = {
  style: defaultStyles,
};

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: (token, pk) => dispatch(loadProfile(token, pk)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MemberView);
