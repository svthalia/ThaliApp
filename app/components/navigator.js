import React from 'react';
import { connect } from 'react-redux';
import Drawer from 'react-native-drawer';
import * as actions from '../actions/navigation';
import Login from './Login';
import Welcome from './Welcome';
import Sidebar from './Sidebar';

// const mapStateToProps = state => state.currentScene;

const mapStateToProps = state => (
  { currentScene: state.navigation.currentScene }
);

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
});

const sceneToComponent = (scene) => {
  switch (scene) {
    case 'login':
      return <Login />;
    case 'welcome':
      return <Welcome />;
    default:
      return <Login />;
  }
};

const ReduxNavigator = props => (
  <Drawer
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
  </Drawer>
  );

ReduxNavigator.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
