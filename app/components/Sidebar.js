import React from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../style';
import styles from './style/sidebar';

import * as actions from '../actions/navigation';
import * as loginActions from '../actions/login';

const background = require('../img/huygens.jpg');

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
      onPress: props.logout,
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
        onPress={() => props.navigate('profile')}
        style={styles.headerButton}
      >
        <Image
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
        </Image>
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
            size={28}
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
  currentScene: React.PropTypes.string.isRequired,
  displayName: React.PropTypes.string.isRequired,
  photo: React.PropTypes.string.isRequired,
  navigate: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
  displayName: state.session.displayName,
  photo: state.session.photo,
});

const mapDispatchToProps = dispatch => ({
  navigate: (scene, newSection = false) => dispatch(actions.navigate(scene, newSection)),
  logout: () => dispatch(loginActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
