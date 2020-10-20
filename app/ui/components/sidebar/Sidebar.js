import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Image,
  ImageBackground,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './style/Sidebar';
import Colors from '../../style/Colors';

const background = require('../../../assets/img/huygens.jpg');

const logoutPrompt = (props) => () =>
  Alert.alert('Log out?', 'Are you sure you want to log out?', [
    { text: 'No' },
    { text: 'Yes', onPress: props.signOut },
  ]);

const Sidebar = (props) => {
  const buttons = [
    {
      onPress: () => props.openWelcome(),
      iconName: 'home',
      text: 'Welcome',
      style: {},
      routeName: 'Welcome',
    },
    {
      onPress: () => props.openCalendar(),
      iconName: 'event',
      text: 'Calendar',
      style: {},
      routeName: 'Calendar',
    },
    {
      onPress: () => props.openMemberList(),
      iconName: 'people',
      text: 'Member List',
      style: {},
      routeName: 'MemberList',
    },
    {
      onPress: () => props.openPhotos(),
      iconName: 'photo',
      text: 'Photos',
      style: {},
      routeName: 'Photos',
    },
    {
      onPress: () => props.openSettings(),
      iconName: 'settings',
      text: 'Settings',
      style: {},
      routeName: 'Settings',
    },
    {
      onPress: logoutPrompt(props),
      iconName: 'lock',
      text: 'Logout',
      style: {
        borderTopColor: Colors.lightGray,
        borderTopWidth: 1,
      },
      routeName: 'signOut',
    },
  ];

  return (
    <View style={styles.sidebar}>
      <TouchableHighlight
        onPress={() => props.loadProfile()}
        style={styles.headerButton}
      >
        <ImageBackground
          source={background}
          style={styles.headerImage}
          resizeMode='cover'
        >
          <LinearGradient
            colors={['#55000000', '#000000']}
            style={styles.headerGradient}
          />
          <Image
            source={{ uri: props.photo }}
            style={styles.profileImage}
            resizeMode='cover'
          />
          <Text style={styles.nameField}>{props.displayName}</Text>
        </ImageBackground>
      </TouchableHighlight>
      <View style={styles.buttonList}>
        {buttons.map((button) => (
          <Icon.Button
            onPress={button.onPress}
            name={button.iconName}
            borderRadius={0}
            backgroundColor={Colors.white}
            color={
              props.activeItemKey === button.routeName
                ? Colors.magenta
                : Colors.textColour
            }
            size={24}
            iconStyle={styles.buttonIcon}
            style={[styles.button, button.style]}
            key={button.routeName}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color:
                    props.activeItemKey === button.routeName
                      ? Colors.magenta
                      : Colors.textColour,
                },
              ]}
            >
              {button.text}
            </Text>
          </Icon.Button>
        ))}
      </View>
    </View>
  );
};

Sidebar.propTypes = {
  activeItemKey: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  loadProfile: PropTypes.func.isRequired,
  openCalendar: PropTypes.func.isRequired,
  openWelcome: PropTypes.func.isRequired,
  openSettings: PropTypes.func.isRequired,
  openMemberList: PropTypes.func.isRequired,
  openPhotos: PropTypes.func.isRequired,
};

export default Sidebar;
