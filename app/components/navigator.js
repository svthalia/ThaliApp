import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Event from './Event';
import Calendar from './Calendar';

import * as actions from '../actions/navigation';
import { colors } from '../style';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: colors.darkMagenta,
  },
  appBar: {
    backgroundColor: colors.magenta,
    height: APPBAR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  title: {
    color: colors.white,
    fontSize: 24,
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 50,
    color: colors.white,
  },
});

const ReduxNavigator = (props) => {
  const { currentScene, loggedIn, drawerOpen, updateDrawer } = props;
  if (loggedIn) {
    return (<Drawer
      type="displace"
      content={<Sidebar />}
      openDrawerOffset={0.2}
      panOpenMask={0.2}
      panCloseMask={0.2}
      panThreshold={0.3}
      styles={{
        mainOverlay: {
          backgroundColor: colors.black,
          opacity: 0,
        }
      }}
      tweenHandler={ratio => ({ mainOverlay: { opacity: ratio * 0.75 } })}
      open={drawerOpen}
      onOpen={() => updateDrawer(true)}
      onClose={() => updateDrawer(false)}
      tapToClose
    >
      <View style={styles.statusBar}>
        <StatusBar backgroundColor={colors.darkMagenta} barStyle='light-content' />
      </View>
      <View style={styles.appBar}>
        <TouchableOpacity
          onPress={props.isFirstScene ? () => props.updateDrawer(!props.drawerOpen) : props.back}
        >
          <Icon
            name={props.isFirstScene ? 'bars' : 'arrow-left'}
            onClick={props.back}
            style={styles.icon}
            size={20}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{sceneToTitle(currentScene)}</Text>
      </View>
      {sceneToComponent(currentScene)}
    </Drawer>);
  }
  return <Login />;
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
  isFirstScene: state.navigation.previousScenes.length == 0,
});

const mapDispatchToProps = dispatch => ({
  updateDrawer: isOpen => dispatch(actions.updateDrawer(isOpen)),
  back: () => dispatch(actions.back()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
