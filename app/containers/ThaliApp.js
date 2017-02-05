import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as ThaliAppActions from '../actions/ThaliAppActions';

class ThaliApp extends Component {
  render() {
    // const { state, actions } = this.props;
    return (
      <Login
        loggedIn={this.props.state.loggedIn}
        {...this.props.actions}
      />
    );
  }
}

ThaliApp.propTypes = {
  state: React.PropTypes.objectOf(React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
    React.PropTypes.number,
  ])).isRequired,
  actions: React.PropTypes.objectOf(React.PropTypes.func).isRequired,
};

export default connect(
  state => (
    { state: state.login }
  ),
  dispatch => (
    { actions: bindActionCreators(ThaliAppActions, dispatch) }
  ),
)(ThaliApp);
