import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const Login = (props) => {
  const { enterPassword, loginError, login } = props;
  return (
    <View>
      <TextInput
        placeholder="Username"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={enterPassword}
      />
      <Button title="Log in" onPress={login} />
      <Text>{ loginError ? 'Login faal' : '' }</Text>
    </View>
  );
};

Login.propTypes = {
  login: React.PropTypes.func.isRequired,
  enterPassword: React.PropTypes.func.isRequired,
  loginError: React.PropTypes.bool.isRequired,
};

export default Login;
