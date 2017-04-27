import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/login';

const loginResult = (status) => {
  switch (status) {
    case 'progress':
      return 'Logging in';
    case 'failure':
      return 'Login failed';
    case 'logout':
      return 'Logout successful';
    default:
      return '';
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { loginState, login } = this.props;
    return (
      <View>
        <TextInput
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={password => this.setState({ password })}
        />
        <Button title="Log in" onPress={() => login(this.state.username, this.state.password)} />
        <Text>{loginResult(loginState)}</Text>
      </View>
    );
  }
}

Login.propTypes = {
  loginState: React.PropTypes.string.isRequired,
  login: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
