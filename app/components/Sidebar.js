import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Text, View, Image, TouchableHighlight, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../style';
import styles from './style/sidebar';

import * as navigationActions from '../actions/navigation';
import * as loginActions from '../actions/login';
import * as profileActions from '../actions/profile';

const background = require('../img/huygens.jpg');

const logoutPrompt = logout => () => Alert.alert(
  'Log out?',
  'Are you sure you want to log out?',
  [{ text: 'Cancel' },
    { text: 'Log out', onPress: logout },
  ],
);

const Sidebar = (props) => {
  const buttons = [
    {
      onPress: () => props.navigate('welcome', true),
      iconName: 'home',
      text: 'Welkom',
      style: {},
      scene: 'welcome',
    },
    {
      onPress: () => props.navigate('eventList', true),
      iconName: 'event',
      text: 'Agenda',
      style: {},
      scene: 'eventList',
    },
    {
      onPress: logoutPrompt(props.logout),
      iconName: 'lock',
      text: 'Uitloggen',
      style: {
        borderTopColor: colors.lightGray,
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
          <Text style={styles.nameField}>{props.displayName}</Text>
        </ImageBackground>
      </TouchableHighlight>
      <View style={styles.buttonList}>
        {buttons.map(button => (
          <Icon.Button
            onPress={button.onPress}
            name={button.iconName}
            borderRadius={0}
            backgroundColor={colors.white}
            color={props.currentScene === button.scene ?
                 colors.magenta : colors.textColour}
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
  logout: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  navigate: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
