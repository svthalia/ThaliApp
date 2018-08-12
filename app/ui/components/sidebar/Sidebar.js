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
import * as loginActions from '../../../actions/session';
import Colors from '../../style/Colors';
import * as profileActions from '../../../actions/profile';

const background = require('../../../assets/img/huygens.jpg');

const logoutPrompt = props => () => Alert.alert(
  props.t('Log out?'),
  props.t('Are you sure you want to log out?'),
  [{ text: props.t('No') },
    { text: props.t('Yes'), onPress: props.signOut },
  ],
);

const Sidebar = (props) => {
  const buttons = [
    {
      onPress: () => props.navigation.navigate('Welcome'),
      iconName: 'home',
      text: props.t('Welcome'),
      style: {},
      routeName: 'Welcome',
    },
    {
      onPress: () => props.navigation.navigate('Calendar'),
      iconName: 'event',
      text: props.t('Calendar'),
      style: {},
      routeName: 'Calendar',
    },
    {
      onPress: () => props.navigation.navigate('MemberList'),
      iconName: 'people',
      text: props.t('Member List'),
      style: {},
      routeName: 'MemberList',
    },
    {
      onPress: () => props.navigation.navigate('Settings'),
      iconName: 'settings',
      text: props.t('Settings'),
      style: {},
      routeName: 'Settings',
    },
    {
      onPress: logoutPrompt(props),
      iconName: 'lock',
      text: props.t('Logout'),
      style: {
        borderTopColor: Colors.lightGray,
        borderTopWidth: 1,
      },
      routeName: 'signOut',
    },
  ];

  return (
    <View
      style={styles.sidebar}
    >
      <TouchableHighlight
        onPress={() => props.loadProfile()}
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
            color={props.activeItemKey === button.routeName
              ? Colors.magenta : Colors.textColour}
            size={24}
            iconStyle={styles.buttonIcon}
            style={[styles.buttonText, button.style]}
            key={button.routeName}
          >
            {button.text}
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
  t: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  displayName: state.session.displayName,
  photo: state.session.photo,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(profileActions.profile()),
  signOut: () => dispatch(loginActions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('components/sidebar/Sidebar')(Sidebar));
