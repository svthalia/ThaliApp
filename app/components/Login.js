import React, { Component } from 'react';
import { View, TextInput, Button } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { login } = this.props;

    return (
      <View>
        <TextInput
          placeholder="Username"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
        />
        <Button title="Log in" onPress={login} />
      </View>
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
};
