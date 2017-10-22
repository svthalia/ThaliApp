import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
  Linking,
  Image,
  TouchableHighlight,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import styles from './style/login';
import { url } from '../url';

import * as actions from '../actions/login';
import DismissKeyboardView from './DismissKeyboardView';

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
    const { login, t } = this.props;
    return (
      <KeyboardAvoidingView
        style={styles.rootWrapper}
        behavior="padding"
        modalOpen="false"
      >
        <DismissKeyboardView
          contentStyle={styles.wrapper}
        >
          <Image style={styles.logo} source={image} />
          <View>
            <TextInput
              style={styles.input}
              placeholder={t('Username')}
              autoCapitalize="none"
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Password')}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={() => {
                login(this.state.username, this.state.password);
              }}
            />
          </View>
          <TouchableHighlight
            style={styles.blackbutton} onPress={() =>
            login(this.state.username, this.state.password)}
          >
            <Text style={styles.loginText}>{t('LOGIN')}</Text>
          </TouchableHighlight>
          <Text style={styles.forgotpass} onPress={() => Linking.openURL(`${url}/password_reset/`)}>
            {t('Forgot password?')}
          </Text>
        </DismissKeyboardView>
      </KeyboardAvoidingView>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    Keyboard.dismiss();
    dispatch(actions.login(username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(translate(['login'])(Login));
