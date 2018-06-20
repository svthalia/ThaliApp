import React from 'react';
import PropTypes from 'prop-types';
import { View, Keyboard, TouchableWithoutFeedback, StyleSheet, ViewPropTypes } from 'react-native';

const DismissKeyboardView = props => (
  <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}
    accessible={false}
    style={props.style}
  >
    <View
      style={props.contentStyle}
    >
      {props.children}
    </View>
  </TouchableWithoutFeedback>
);

DismissKeyboardView.propTypes = {
  children: PropTypes.node.isRequired,
  style: ViewPropTypes.style,
  contentStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
});

DismissKeyboardView.defaultProps = {
  style: styles,
  contentStyle: styles,
};

export default DismissKeyboardView;
