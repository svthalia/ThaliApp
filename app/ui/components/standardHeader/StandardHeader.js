/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import StatusBar from '@react-native-community/status-bar';
import PropTypes from 'prop-types';

import { withNavigation } from '@react-navigation/compat';
import Colors from '../../style/Colors';
import styles from './style/StandardHeader';
import IconButton from '../button/IconButton';

const sceneToTitle = (routeName) => {
  switch (routeName) {
    case 'Welcome':
      return 'Welcome';
    case 'Event':
      return 'Event';
    case 'Calendar':
      return 'Calendar';
    case 'Pizza':
      return 'Pizza';
    case 'Profile':
      return 'Profile';
    case 'Registration':
      return 'Registration';
    case 'Photos':
      return 'Photos';
    case 'PhotoAlbum':
      return 'Album';
    case 'Settings':
      return 'Settings';
    case 'EventAdmin':
      return 'Registrations';
    case 'PizzaAdmin':
      return 'Orders';
    default:
      return 'ThaliApp';
  }
};

const StandardHeader = (props) => (
  <View>
    <View style={styles.statusBar}>
      <StatusBar
        backgroundColor={Colors.semiTransparent}
        translucent
        animated
        barStyle='light-content'
      />
    </View>
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appBar}>
        <IconButton
          onPress={() =>
            props.menu ? props.navigation.toggleDrawer() : props.navigation.goBack()
          }
          name={props.menu ? 'menu' : 'arrow-back'}
          style={styles.iconButton}
          iconStyle={styles.icon}
        />
        <Text style={styles.title}>
          {sceneToTitle(props.navigation.state.routeName)}
        </Text>
        <View style={styles.rightView}>{props.rightView}</View>
      </View>
    </SafeAreaView>
  </View>
);

StandardHeader.propTypes = {
  menu: PropTypes.bool,
  rightView: PropTypes.element,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

StandardHeader.defaultProps = {
  rightView: null,
  menu: false,
};

const StandardHeaderContainer = withNavigation(StandardHeader);
export default StandardHeaderContainer;

export function withStandardHeader(Component, menu) {
  return (props) => (
    <View style={styles.rootWrapper}>
      <StandardHeaderContainer menu={menu} />
      <Component {...props} />
    </View>
  );
}
