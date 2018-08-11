import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Text,
  TextInput,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { url } from '../../../utils/url';

import * as actions from '../../../actions/session';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';
import Button from '../../components/button/Button';
import styles from './style/Login';
import Colors from '../../style/Colors';

const image = require('../../../assets/img/logo.png');

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
              underlineColorAndroid={Colors.textColour}
              onChangeText={username => this.setState({ username })}
            />
            <TextInput
              style={styles.input}
              placeholder={t('Password')}
              underlineColorAndroid={Colors.textColour}
              autoCapitalize="none"
              secureTextEntry
              onChangeText={password => this.setState({ password })}
              onSubmitEditing={() => {
                login(this.state.username, this.state.password);
              }}
            />
          </View>
          <Button
            title={t('LOGIN')}
            onPress={() => login(this.state.username, this.state.password)}
            color={Colors.darkGrey}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            underlayColor={Colors.white}
          />
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
    dispatch(actions.signIn(username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(translate(['screens/user/Login'])(Login));
