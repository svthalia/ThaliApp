import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.login = props.login;
  }

  onPress() {
    return this.login.bind(null, this.state.username, this.state.password);
  }

  render() {
    const { loginError } = this.props;
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
        <Button title="Log in" onPress={this.onPress()} />
        <Text>{ loginError ? 'Login faal' : '' }</Text>
      </View>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  loginError: React.PropTypes.bool.isRequired,
};
