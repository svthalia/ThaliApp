import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as ThaliAppActions from '../actions/ThaliAppActions';

class ThaliApp extends Component {

  render() {
    const { state, actions } = this.props;
    return (
      <Login
        loggedIn={state.loggedIn}
        {...actions}
      />
    );
  }
}

export default connect(
  state => (
    { state: state.login }
  ),
  dispatch => (
    { actions: bindActionCreators(ThaliAppActions, dispatch) }
  ),
)(ThaliApp);
