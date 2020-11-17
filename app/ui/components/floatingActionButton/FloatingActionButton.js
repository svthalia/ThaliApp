import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import Colors from '../../style/Colors';
import styles from './style/FloatingActionButton';

const FloatingActionButton = (props) => (
  <TouchableHighlight onPress={props.onPress} style={styles.floatingActionButton}>
    <View style={styles.floatingActionButtonWrapper}>
      <Icon name={props.name} size={32} color={Colors.white} />
    </View>
  </TouchableHighlight>
);

FloatingActionButton.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default FloatingActionButton;
