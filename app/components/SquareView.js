import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes, StyleSheet } from 'react-native';

const SquareView = props => (
  <View
    style={[props.style, { width: props.size, height: props.size }]}
  >
    {props.children}
  </View>
);

SquareView.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.number.isRequired,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
});

SquareView.defaultProps = {
  style: styles,
};

export default SquareView;
