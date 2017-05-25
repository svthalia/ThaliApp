import React from 'react';
import { Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Event from './Event';
import Calendar from './Calendar';

import * as actions from '../actions/navigation';
import styles from './style/navigator';
import { colors } from '../style';

const sceneToComponent = (scene) => {
  switch (scene) {
    case 'welcome':
      return <Welcome />;
    case 'event':
      return <Event />;
    case 'eventList':
      return <Calendar />;
    default:
      return <Welcome />;
  }
};

const sceneToTitle = (scene) => {
  switch (scene) {
    case 'welcome':
      return 'Welkom';
    case 'event':
      return 'Evenement';
    case 'eventList':
      return 'Agenda';
    default:
      return 'ThaliApp';
  }
};

const ReduxNavigator = (props) => {
  const { currentScene, loggedIn, drawerOpen, updateDrawer } = props;
  if (loggedIn) {
    return (<Drawer
      type="overlay"
      content={<Sidebar />}
      openDrawerOffset={0.2}
      panOpenMask={0.2}
      panCloseMask={0.2}
      panThreshold={0.3}
      styles={{
        mainOverlay: {
          backgroundColor: colors.black,
          opacity: 0,
          elevation: 100
        },
      }}
      tweenHandler={ratio => ({ mainOverlay: { opacity: ratio * 0.75 } })}
      open={drawerOpen}
      onOpen={() => updateDrawer(true)}
      onClose={() => updateDrawer(false)}
      tapToClose
    >
      <View style={styles.statusBar}>
        <StatusBar backgroundColor={colors.darkMagenta} barStyle="light-content" />
      </View>
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={props.isFirstScene ? () => props.updateDrawer(!props.drawerOpen) : props.back}
        >
          <Icon
            name={props.isFirstScene ? 'menu' : 'arrow-back'}
            onClick={props.back}
            style={styles.icon}
            size={24}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{sceneToTitle(currentScene)}</Text>
      </View>
      {sceneToComponent(currentScene)}
    </Drawer>);
  }
  return (
    <View>
      <View style={styles.statusBar}>
        <StatusBar backgroundColor={colors.darkMagenta} barStyle="light-content" />
      </View>
      <Login />
    </View>);
};

ReduxNavigator.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  drawerOpen: React.PropTypes.bool.isRequired,
  isFirstScene: React.PropTypes.bool.isRequired,
  updateDrawer: React.PropTypes.func.isRequired,
  back: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
  loggedIn: state.navigation.loggedIn,
  drawerOpen: state.navigation.drawerOpen,
  isFirstScene: state.navigation.previousScenes.length === 0,
});

const mapDispatchToProps = dispatch => ({
  updateDrawer: isOpen => dispatch(actions.updateDrawer(isOpen)),
  back: () => dispatch(actions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
