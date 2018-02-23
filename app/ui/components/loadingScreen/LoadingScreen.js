import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from './style/LoadingScreen';
import Colors from '../../style/Colors';


const LoadingScreen = () => (
  <View
    style={styles.indicatorView}
  >
    <ActivityIndicator
      animating
      color={Colors.magenta}
      size="large"
    />
  </View>
);

export default LoadingScreen;
