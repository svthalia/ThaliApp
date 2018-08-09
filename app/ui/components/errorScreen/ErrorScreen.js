import React from 'react';
import { Image, Text, View } from 'react-native';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from './style/ErrorScreen';

const cloud = require('../../../assets/img/sad_cloud.png');

const ErrorScreen = props => (
  <View
    style={styles.content}
  >
    <Image
      source={cloud}
      style={styles.image}
    />
    <Text style={styles.text}>
      {props.message}
    </Text>
    <Text style={styles.text}>
      {props.t('Try again later.')}
    </Text>
  </View>
);

ErrorScreen.propTypes = {
  message: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('components/errorScreen/ErrorScreen')(ErrorScreen);
