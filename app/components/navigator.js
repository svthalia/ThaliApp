import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/navigation';
import Login from './Login';
import Welcome from './Welcome';

// const mapStateToProps = state => state.currentScene;

const mapStateToProps = state => (
  { currentScene: state.navigation.currentScene }
);

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
});

const ReduxNavigator = (props) => {
  const currentScene = props.currentScene;
  switch (currentScene) {
    case 'login':
      return (<Login />);
    case 'welcome':
      return (<Welcome />);
    default:
      return (<Login />);
  }
};

ReduxNavigator.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxNavigator);
