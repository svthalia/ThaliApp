import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    const { loggedIn, login } = this.props;

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
        <Text>{loggedIn ? 'MEMES' : 'MMS'}</Text>
      </View>
    );
  }
}

Login.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
  login: React.PropTypes.func.isRequired,
};
