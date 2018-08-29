import { ActivityIndicator, Image, View } from 'react-native';
import React from 'react';
import styles from './style/SplashScreen';
import Colors from '../../style/Colors';

const image = require('../../../assets/img/logo.png');

const SplashScreen = () => (
  <View style={styles.wrapper}>
    <Image style={styles.logo} source={image} />
    <ActivityIndicator color={Colors.white} size="large" />
  </View>
);

export default SplashScreen;
