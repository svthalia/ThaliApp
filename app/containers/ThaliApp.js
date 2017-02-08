import React from 'react';
// import { Navigator } from 'react-native';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as ThaliAppActions from '../actions/ThaliAppActions';

const ThaliApp = props => (
  <Login {...props} />
  );

ThaliApp.propTypes = {
  login: React.PropTypes.func.isRequired,
  loggedIn: React.PropTypes.bool.isRequired,
  loginError: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
  loginError: state.login.loginError,
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(ThaliAppActions.login()),
  enterPassword: password => dispatch(ThaliAppActions.enterPassword(password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThaliApp);
