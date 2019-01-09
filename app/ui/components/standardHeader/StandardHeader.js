import React from 'react';
import {
  StatusBar, Text, TouchableOpacity, View,
} from 'react-native';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { withNavigation } from 'react-navigation';
import Colors from '../../style/Colors';
import styles from './style/StandardHeader';

const sceneToTitle = (routeName, t) => {
  switch (routeName) {
    case 'Welcome':
      return t('Welcome');
    case 'Event':
      return t('Event');
    case 'Calendar':
      return t('Calendar');
    case 'Pizza':
      return t('Pizza');
    case 'Profile':
      return t('Profile');
    case 'Registration':
      return t('Registration');
    case 'Settings':
      return t('Settings');
    case 'EventAdmin':
      return t('Registrations');
    default:
      return 'ThaliApp';
  }
};

const StandardHeader = props => (
  <View>
    <View style={styles.statusBar}>
      <StatusBar
        backgroundColor={Colors.semiTransparent}
        translucent
        animated
        barStyle="light-content"
      />
    </View>
    <View style={styles.appBar}>
      <TouchableOpacity
        onPress={() => (props.menu ? props.navigation.toggleDrawer() : props.navigation.goBack())}
      >
        <Icon
          name={props.menu ? 'menu' : 'arrow-back'}
          style={styles.icon}
          size={24}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {sceneToTitle(props.navigation.state.routeName, props.t)}
      </Text>
      <View style={styles.rightView}>
        {props.rightView}
      </View>
    </View>
  </View>
);

StandardHeader.propTypes = {
  menu: PropTypes.bool,
  rightView: PropTypes.element,
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

StandardHeader.defaultProps = {
  rightView: null,
  menu: false,
};

const StandardHeaderContainer = withNavigation(translate('components/standardHeader/StandardHeader')(StandardHeader));
export default StandardHeaderContainer;

export function withStandardHeader(Component, menu) {
  return props => (
    <View style={styles.rootWrapper}>
      <StandardHeaderContainer menu={menu} />
      <Component
        {...props}
      />
    </View>
  );
}
