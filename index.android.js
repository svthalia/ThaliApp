import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';
import {styles} from './styles.js';

export default class ThaliApp extends Component {
  render() {
    return (
      <View style={styles.body}>
      <Text style={styles.welcome}>
      Welcome to React Native!
      </Text>
      <Text style={styles.bodyText}>
      Welkom in de nieuwe ThaliApp!
      </Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('ThaliApp', () => ThaliApp);
