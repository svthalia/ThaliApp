import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Text,
  TextInput,
  View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import { url } from '../../../utils/url';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';
import Button from '../../components/button/Button';
import styles from './style/LoginScreen';
import Colors from '../../style/Colors';
import { STATUS_SIGNING_IN } from '../../../reducers/session';

const image = require('../../../assets/img/logo.png');

const configureNextAnimation = () => {
  /* istanbul ignore next */
  LayoutAnimation.configureNext(LayoutAnimation.create(150,
    LayoutAnimation.Types.linear, LayoutAnimation.Properties.opacity));
};


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    configureNextAnimation();
  }

  render() {
    configureNextAnimation();
    const {
      login, t, status, openUrl,
    } = this.props;

    let content = (
      <View>
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
        <Text style={styles.linkText} onPress={() => openUrl(`${url}/password_reset/`)}>
          {t('Forgot password?')}
        </Text>
        <Text style={styles.linkText} onPress={() => openUrl(`${url}/registration/`)}>
          {t('Become a member')}
        </Text>
      </View>
    );

    if (status === STATUS_SIGNING_IN) {
      content = (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={Colors.white}
          size="large"
          animating
        />
      );
    }

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
          {content}
        </DismissKeyboardView>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  openUrl: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default withTranslation('ui/screens/login/LoginScreen')(LoginScreen);
