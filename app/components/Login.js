import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Linking, Image, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import styles from './style/login';
import { url } from '../url';

import * as actions from '../actions/login';

const image = require('../img/logo.png');

class Login extends Component {
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
        <TouchableHighlight
          style={styles.blackbutton} onPress={() =>
        login(this.state.username, this.state.password)}
        >
          <Text style={styles.loginText}>INLOGGEN</Text>
        </TouchableHighlight>
        <Text style={styles.forgotpass} onPress={() => Linking.openURL(`${url}/password_reset/`)}>
          Wachtwoord vergeten?
        </Text>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(actions.login(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
