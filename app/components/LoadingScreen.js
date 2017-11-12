import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { colors } from '../style';
import styles from './style/loadingScreen';


const LoadingScreen = () => (
  <View
    style={styles.indicatorView}
  >
    <ActivityIndicator
      animating
      color={colors.magenta}
      size="large"
    />
  </View>
);

export default LoadingScreen;
