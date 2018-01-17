import React from 'react';
import { Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style/errorScreen';

const cloud = require('../img/sad_cloud.png');

const ErrorScreen = props => (
  <View
    style={styles.content}
  >
    <Image
      source={cloud}
      style={styles.image}
    />
    <Text style={styles.text}>{props.message}</Text>
    <Text style={styles.text}>Try again later.</Text>
  </View>
);

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorScreen;
