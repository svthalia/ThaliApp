import React from 'react';
import {
  Platform, Text, TouchableHighlight, View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style/button';
import { colors } from '../style';

const Button = (props) => {
  const touchableStyles = [props.style, styles.touchable];
  if (props.disabled) {
    touchableStyles.push(styles.disabled);
  }
  const title = Platform.OS === 'ios' ? props.title : props.title.toUpperCase();
  return (
    <TouchableHighlight
      disabled={props.disabled}
      onPress={props.disabled ? null : props.onPress}
      style={touchableStyles}
      underlayColor={props.underlayColor}
    >
      <View
        style={[styles.container, { backgroundColor: props.color }]}
      >
        <Text style={[styles.text, props.textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  ...ViewPropTypes,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-typos
  textStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
};

Button.defaultProps = {
  color: colors.magenta,
  disabled: false,
  textStyle: {},
  underlayColor: colors.white,
};

export default Button;
