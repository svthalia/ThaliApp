import { Dimensions } from 'react-native';

import { StyleSheet, colors } from '../../style';
import { STATUSBAR_HEIGHT, APPBAR_HEIGHT } from './standardHeader';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: colors.magenta,
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    elevation: 4,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'sans-serif-medium',
    flex: 1,
  },
  leftIcon: {
    paddingLeft: 20,
    paddingRight: 32,
  },
  rightIcon: {
    paddingLeft: 32,
    paddingRight: 20,
  },
  white: {
    color: colors.white,
  },
  magenta: {
    color: colors.magenta,
  },
  gray: {
    color: colors.lightGray,
  },
  input: {
    color: colors.textColour,
    fontSize: 20,
    flex: 1,
    paddingLeft: 0,
  },
  animationView: {
    backgroundColor: colors.white,
    width: windowWidth * 2,
    height: windowWidth * 2,
    borderRadius: windowWidth,
    position: 'absolute',
    right: 32 - windowWidth,
  },
});

export default styles;
