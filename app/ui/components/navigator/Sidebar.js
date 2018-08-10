import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Image, ImageBackground, Text, TouchableHighlight, View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style/Sidebar';

import * as navigationActions from '../../../actions/navigation';
import * as loginActions from '../../../actions/login';
import * as profileActions from '../../../actions/profile';
import Colors from '../../style/Colors';
import {
  EVENT_LIST_SCENE, MEMBERS_SCENE, SETTINGS_SCENE, WELCOME_SCENE,
} from './scenes';

const background = require('../../../assets/img/huygens.jpg');

const logoutPrompt = props => () => Alert.alert(
  props.t('Log out?'),
  props.t('Are you sure you want to log out?'),
  [{ text: props.t('No') },
    { text: props.t('Yes'), onPress: props.logout },
  ],
);

const Sidebar = (props) => {
  const buttons = [
    {
      onPress: () => props.navigate(WELCOME_SCENE, true),
      iconName: 'home',
      text: props.t('Welcome'),
      style: {},
      scene: WELCOME_SCENE,
    },
    {
      onPress: () => props.navigate(EVENT_LIST_SCENE, true),
      iconName: 'event',
      text: props.t('Calendar'),
      style: {},
      scene: EVENT_LIST_SCENE,
    },
    {
      onPress: () => props.navigate(MEMBERS_SCENE, true),
      iconName: 'people',
      text: props.t('Member List'),
      style: {},
      scene: MEMBERS_SCENE,
    },
    {
      onPress: () => props.navigate(SETTINGS_SCENE, true),
      iconName: 'settings',
      text: props.t('Settings'),
      style: {},
      scene: SETTINGS_SCENE,
    },
    {
      onPress: logoutPrompt(props),
      iconName: 'lock',
      text: props.t('Logout'),
      style: {
        borderTopColor: Colors.lightGray,
        borderTopWidth: 1,
      },
      scene: 'logout',
    },
  ];

  return (
    <View
      style={styles.sidebar}
    >
      <TouchableHighlight
        onPress={() => props.loadProfile(props.token)}
        style={styles.headerButton}
      >
        <ImageBackground
          source={background}
          style={styles.headerImage}
          resizeMode="cover"
        >
          <LinearGradient colors={['#55000000', '#000000']} style={styles.headerGradient} />
          <Image
            source={{ uri: props.photo }}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <Text style={styles.nameField}>
            {props.displayName}
          </Text>
        </ImageBackground>
      </TouchableHighlight>
      <View style={styles.buttonList}>
        {buttons.map(button => (
          <Icon.Button
            onPress={button.onPress}
            name={button.iconName}
            borderRadius={0}
            backgroundColor={Colors.white}
            color={props.currentScene === button.scene
              ? Colors.magenta : Colors.textColour}
            size={24}
            iconStyle={styles.buttonIcon}
            style={[styles.buttonText, button.style]}
            key={button.scene}
          >
            {button.text}
          </Icon.Button>
        ))}
      </View>
    </View>
  );
};

Sidebar.propTypes = {
  currentScene: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  logout: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  navigate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
  displayName: state.session.displayName,
  photo: state.session.photo,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  navigate: (scene, newSection = false) => dispatch(navigationActions.navigate(scene, newSection)),
  logout: () => dispatch(loginActions.logout()),
  loadProfile: token => dispatch(profileActions.profile(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('components/navigator/Sidebar')(Sidebar));
