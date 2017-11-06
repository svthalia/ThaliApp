import React from 'react';
import { View, StatusBar, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../style';
import styles from './style/standardHeader';

import * as actions from '../actions/navigation';

const sceneToTitle = (scene) => {
  switch (scene) {
    case 'welcome':
      return 'Welkom';
    case 'event':
      return 'Evenement';
    case 'eventList':
      return 'Agenda';
    case 'pizza':
      return 'Pizza';
    case 'profile':
      return 'Profiel';
    default:
      return 'ThaliApp';
  }
};

const StandardHeader = props => (
  <View>
    <View style={styles.statusBar}>
      <StatusBar
        backgroundColor={colors.statusBar}
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
      <Text style={styles.title}>{sceneToTitle(props.currentScene)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(StandardHeader);
