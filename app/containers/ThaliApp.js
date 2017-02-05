import React,{Component} from 'react';
import Login from '../components/Login';
import {bindActionCreators} from 'redux';
import * as ThaliAppActions from '../actions/ThaliAppActions';
import { connect } from 'react-redux';

class ThaliApp extends Component {
  constructor(props) {
    super(props);
  }

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
    {state: state.login}
  ),
  (dispatch) => (
    {actions: bindActionCreators(ThaliAppActions, dispatch)}
  )
)(ThaliApp);
