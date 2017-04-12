import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';
import Calendar from './Calendar';
import Agenda from './Calendar';

import * as actions from '../actions/navigation';

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
  loggedIn: state.navigation.loggedIn,
  drawerOpen: state.navigation.drawerOpen,
});

const mapDispatchToProps = dispatch => ({
  updateDrawer: isOpen => dispatch(actions.updateDrawer(isOpen)),
});

const sceneToComponent = (scene) => {
  switch (scene) {
    case 'welcome':
      return <Welcome />;
    case 'eventList':
      return <Calendar />;
    default:
      return <Welcome />;
  }
};

const ReduxNavigator = (props) => {
  const { currentScene, loggedIn, drawerOpen, updateDrawer } = props;
  if (loggedIn) {
    return (<Drawer
      type="displace"
      content={<Sidebar />}
      openDrawerOffset={0.4}
      panOpenMask={0.2}
      panCloseMask={0.2}
      panThreshold={0.3}
      tweenHandler={ratio => ({ main: { opacity: (2 - ratio) / 2 } })}
      open={drawerOpen}
      onOpen={() => updateDrawer(true)}
      onClose={() => updateDrawer(false)}
      tapToClose
    >
      {sceneToComponent(currentScene)}
    </Drawer>);
  }
  return <Login />;
};

ReduxNavigator.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  drawerOpen: React.PropTypes.bool.isRequired,
  updateDrawer: React.PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
