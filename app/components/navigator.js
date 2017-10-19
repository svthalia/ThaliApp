import React from 'react';
import PropTypes from 'prop-types';
import { View, StatusBar, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Event from './Event';
import Calendar from './Calendar';
import Profile from './Profile';
import Pizza from './Pizza';
import StandardHeader from './StandardHeader';
import Registration from './Registration';

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
    case 'profile':
      return <Profile />;
    case 'pizza':
      return <Pizza />;
    case 'registration':
      return <Registration />;
    default:
      return <Welcome />;
  }
};

const ReduxNavigator = (props) => {
  const { currentScene, loggedIn, drawerOpen, updateDrawer,
          isFirstScene, back, navigateToWelcome } = props;
  BackHandler.addEventListener('hardwareBackPress', () => {
    if (!isFirstScene) {
      back();
      return true;
    } else if (currentScene !== 'welcome') {
      navigateToWelcome();
      return true;
    }
    BackHandler.exitApp();
    return true;
  });
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
          elevation: 100,
        },
      }}
      tweenHandler={ratio => ({ mainOverlay: { opacity: ratio * 0.75 } })}
      open={drawerOpen}
      onOpen={() => updateDrawer(true)}
      onClose={() => updateDrawer(false)}
      tapToClose
    >
      {currentScene !== 'profile' && <StandardHeader />}
      {sceneToComponent(currentScene)}
    </Drawer>);
  }
  return (
    <View
      style={styles.flex}
    >
      <View style={styles.statusBar}>
        <StatusBar
          backgroundColor={colors.statusBar}
          barStyle="light-content"
          translucent
          animated
        />
      </View>
      <Login />
    </View>);
};

ReduxNavigator.propTypes = {
  currentScene: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  isFirstScene: PropTypes.bool.isRequired,
  updateDrawer: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  navigateToWelcome: PropTypes.func.isRequired,
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
  navigateToWelcome: () => dispatch(actions.navigate('welcome', true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
