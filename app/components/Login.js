import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Linking, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import SnackBar from 'react-native-snackbar-component';
import styles from './style/login';
import { url } from '../url';

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

const image = require('./logo.png');

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
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior="padding"
        modalOpen="false"
      >
        <Image style={styles.logo} source={image} />
        <View>
          <TextInput
            style={styles.input}
            placeholder="Gebruikersnaam"
            onChangeText={username => this.setState({ username })}
          />
          <TextInput
            style={styles.input}
            placeholder="Wachtwoord"
            secureTextEntry
            onChangeText={password => this.setState({ password })}
            onSubmitEditing={() => { login(this.state.username, this.state.password); }}
          />
        </View>
        <TouchableOpacity
          style={styles.blackbutton} onPress={() =>
        login(this.state.username, this.state.password)}
        >
          <Text style={styles.loginText}>INLOGGEN</Text>
        </TouchableOpacity>
        <Text style={styles.forgotpass} onPress={() => Linking.openURL(`${url}/password_reset/`)}>
          Wachtwoord vergeten?
        </Text>
        <SnackBar visible={loginState !== ''} textMessage={loginResult(loginState)} actionText="let's go" />
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  loginState: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
