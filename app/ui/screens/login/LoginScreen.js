import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  LayoutAnimation,
  Text,
  View,
} from 'react-native';
import { SERVER_URL } from '../../../constants';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';
import Button from '../../components/button/Button';
import styles from './style/LoginScreen';
import Colors from '../../style/Colors';
import { STATUS_SIGNING_IN } from '../../../reducers/session';

const image = require('../../../assets/img/logo.png');

const configureNextAnimation = () => {
  /* istanbul ignore next */
  LayoutAnimation.configureNext(
    LayoutAnimation.create(
      150,
      LayoutAnimation.Types.linear,
      LayoutAnimation.Properties.opacity
    )
  );
};

class LoginScreen extends Component {
  componentDidMount() {
    configureNextAnimation();
  }

  render() {
    configureNextAnimation();
    const { login, status, openUrl } = this.props;

    let content = (
      <View>
        <Button
          title='LOGIN'
          onPress={login}
          color={Colors.darkGrey}
          style={styles.loginButton}
          textStyle={styles.loginButtonText}
          underlayColor={Colors.white}
        />
        <Text
          style={styles.linkText}
          onPress={() => openUrl(`${SERVER_URL}/association/register/`)}
        >
          Become a member
        </Text>
      </View>
    );

    if (status === STATUS_SIGNING_IN) {
      content = (
        <ActivityIndicator
          style={styles.activityIndicator}
          color={Colors.white}
          size='large'
          animating
        />
      );
    }

    return (
      <KeyboardAvoidingView
        style={styles.rootWrapper}
        behavior='padding'
        modalOpen='false'
      >
        <DismissKeyboardView contentStyle={styles.wrapper}>
          <Image style={styles.logo} source={image} />
          {content}
        </DismissKeyboardView>
      </KeyboardAvoidingView>
    );
  }
}

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  openUrl: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

export default LoginScreen;
