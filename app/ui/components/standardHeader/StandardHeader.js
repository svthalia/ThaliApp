import React from 'react';
import {
  View, StatusBar, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../style/Colors';
import styles from './style/StandardHeader';

import * as actions from '../../../actions/navigation';

const sceneToTitle = (scene, t) => {
  switch (scene) {
    case 'welcome':
      return t('Welcome');
    case 'event':
      return t('Event');
    case 'eventList':
      return t('Calendar');
    case 'pizza':
      return t('Pizza');
    case 'profile':
      return t('Profile');
    case 'registration':
      return t('Registration');
    case 'settings':
      return t('Settings');
    case 'pushNotificationsSettings':
      return t('Notifications');
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
        onPress={props.isFirstScene ? () => props.updateDrawer(!props.drawerOpen) : props.back}
      >
        <Icon
          name={props.isFirstScene ? 'menu' : 'arrow-back'}
          style={styles.icon}
          size={24}
        />
      </TouchableOpacity>
      <Text style={styles.title}>
        {sceneToTitle(props.currentScene, props.t)}
      </Text>
      <View style={styles.rightView} />
    </View>
  </View>
);

StandardHeader.propTypes = {
  isFirstScene: PropTypes.bool.isRequired,
  currentScene: PropTypes.string.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  back: PropTypes.func.isRequired,
  updateDrawer: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isFirstScene: state.navigation.previousScenes.length === 0,
  currentScene: state.navigation.currentScene,
  drawerOpen: state.navigation.drawerOpen,
});

const mapDispatchToProps = dispatch => ({
  back: () => dispatch(actions.back()),
  updateDrawer: isOpen => dispatch(actions.updateDrawer(isOpen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(translate('components/standardHeader/StandardHeader')(StandardHeader));
