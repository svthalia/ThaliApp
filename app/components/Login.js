import React, { Component } from 'react';
import { View, TextInput, Text, StyleSheet, Linking, Image, TouchableOpacity } from 'react-native';
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

const colors = {
  magenta: '#E62272',
  buttonColor: '#362b2b',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({

  loginText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  blackbutton: {
    marginTop: 50,
    alignSelf: 'center',
    alignItems: 'center',
    width: 275,
    height: 65,
    backgroundColor: colors.buttonColor,
    justifyContent: 'center',
  },
  input: {
  },

  forgotpass: {
    alignSelf: 'center',
    color: colors.buttonColor,
    marginBottom: 10,
    marginTop: 10,
  },

  loginstatus: {
    marginTop: 10,
    height: 20,
    alignSelf: 'center',
    color: colors.white,
  },

  logo: {
    marginTop: 80,
    marginBottom: 50,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  wrapper: {
    backgroundColor: colors.magenta,
    flex: 1,
  },
});

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
      <View
        style={styles.wrapper}
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
        <Text style={styles.loginstatus}>{loginResult(loginState)}</Text>
        <Text style={styles.forgotpass} onPress={() => Linking.openURL('https://thalia.nu/password_reset/')}>
          Wachtwoord vergeten?
        </Text>
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
