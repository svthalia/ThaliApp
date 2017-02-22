import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import * as actions from '../actions/navigation';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
  loggedIn: state.navigation.token != '',
});

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
});

const sceneToComponent = scene => {
  switch (scene) {
    case 'welcome':
      return <Welcome />;
    // case 'events':
    //   return <Events />;
    // case 'authenticate':
    //   return <Authenticeren />
    default:
      return <Welcome />;
  }
};

const ReduxNavigator = props => {
  if (props.loggedIn) {
    return <Drawer
      type="displace"
      content={<Sidebar />}
      openDrawerOffset={0.4}
      panOpenMask={0.2}
      panCloseMask={0.2}
      panThreshold={0.3}
      tweenHandler={ratio => ({ main: { opacity: (2 - ratio) / 2 } })}
      tapToClose
    >
      {sceneToComponent(props.currentScene)}
    </Drawer>;
  } else {
    return <Login />;
  }
};

ReduxNavigator.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
