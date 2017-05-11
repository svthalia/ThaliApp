import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles, { colors } from '../style';

import * as actions from '../actions/navigation';
import * as loginActions from '../actions/login';

const Sidebar = props => {

  const b64Image = 'data:image/jpeg;base64,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';

  const buttons = [
    {
      onPress: () => props.navigate('welcome'),
      iconName: 'home',
      text: 'Welkom',
      style: {},
      scene: 'welcome',
    },
    {
      onPress: () => props.navigate('eventList'),
      iconName: 'calendar',
      text: 'Agenda',
      style: {},
      scene: 'eventList',
    },
    {
      onPress: props.logout,
      iconName: 'lock open',
      text: 'Uitloggen',
      style: {
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
      },
      scene: '',
    },
  ];

  const width = Dimensions.get('window').width * 0.8;
  const height = width / 640 * 426;

  return (
    <View
      style={styles.sidebar}
    >
      <Image
        source={require('../img/huygens.jpg')}
        style={{width: width, height: height, justifyContent: 'space-around', paddingLeft: 10}}
        resizeMode='contain'
      >
        <Image
          source={{uri: b64Image}}
          style={{width: 100, height: 100, borderRadius: 50, marginBottom: 10}}
          resizeMode='cover'
        />
        <Text style={{color: colors.white, fontSize: 24}}>Gijs Hendriksen</Text>
      </Image>
      {buttons.map((object, i) => (
        <Icon.Button
          onPress={object.onPress}
          name={object.iconName}
          borderRadius={0}
          backgroundColor={colors.white}
          color={props.currentScene === object.scene ?
               colors.magenta : colors.textColour}
          size={28}
          iconStyle={{
          marginRight: 30,
          width: 28,
          textAlign: 'center',
        }}
          textStyle={{fontSize: 28}}
          style={[{padding: 20}, object.style]}
          key={i}
        >
          {object.text}
        </Icon.Button>
      ))}
    </View>
  )
};

Sidebar.propTypes = {
  currentScene: React.PropTypes.string.isRequired,
  navigate: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentScene: state.navigation.currentScene,
});

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
  logout: () => dispatch(loginActions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
