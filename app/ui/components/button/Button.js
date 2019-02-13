import React from 'react';
import {
  Platform, Text, TouchableHighlight, View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style/Button';
import Colors from '../../style/Colors';

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
        style={[styles.container, props.containerStyle, { backgroundColor: props.color }]}
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
  containerStyle: Text.propTypes.style,
  // eslint-disable-next-line react/no-typos
  textStyle: Text.propTypes.style,
  title: PropTypes.string.isRequired,
  underlayColor: PropTypes.string,
};

Button.defaultProps = {
  color: Colors.magenta,
  disabled: false,
  containerStyle: {},
  textStyle: {},
  underlayColor: Colors.white,
};

export default Button;
