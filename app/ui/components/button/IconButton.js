import React from 'react';
import { TouchableOpacity, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Colors from '../../style/Colors';

const IconButton = props => (
  <TouchableOpacity
    disabled={props.disabled}
    onPress={props.disabled ? null : props.onPress}
    style={props.style}
  >
    <Icon
      name={props.name}
      style={props.iconStyle}
      color={props.color}
      size={props.size}
    />
  </TouchableOpacity>
);

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.number,
  iconStyle: Icon.propTypes.style,
  style: ViewPropTypes.style,
};

IconButton.defaultProps = {
  color: Colors.white,
  disabled: false,
  size: 24,
  iconStyle: Icon.defaultProps.style,
  style: {},
};

export default IconButton;
