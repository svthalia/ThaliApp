import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../actions/login';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { loginError, login } = this.props;
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
        <Text>{ loginError ? 'Login faal' : '' }</Text>
      </View>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  loginError: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => state.login;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
