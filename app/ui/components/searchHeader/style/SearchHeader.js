import { Dimensions } from 'react-native';

import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';
import { STATUSBAR_HEIGHT, APPBAR_HEIGHT }
  from '../../standardHeader/style/StandardHeader';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: Colors.magenta,
    height: APPBAR_HEIGHT + STATUSBAR_HEIGHT,
    paddingTop: STATUSBAR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    elevation: 4,
  },
  title: {
    color: Colors.white,
    flex: 1,
    android: {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: '600',
      textAlign: 'center',
    },
  },
  leftIcon: {
    android: {
      paddingLeft: 20,
      paddingRight: 32,
    },
    ios: {
      paddingLeft: 10,
      paddingRight: 16,
    },
  },
  rightIcon: {
    android: {
      paddingLeft: 32,
      paddingRight: 20,
    },
    ios: {
      paddingLeft: 16,
      paddingRight: 10,
    },
  },
  white: {
    color: Colors.white,
  },
  magenta: {
    color: Colors.magenta,
  },
  gray: {
    color: Colors.lightGray,
  },
  input: {
    color: Colors.textColour,
    flex: 1,
    paddingLeft: 0,
    android: {
      fontSize: 20,
    },
    ios: {
      fontSize: 18,
    },
  },
  animationView: {
    backgroundColor: Colors.white,
    width: windowWidth * 2,
    height: windowWidth * 2,
    borderRadius: windowWidth,
    position: 'absolute',
    right: 32 - windowWidth,
  },
});

export default styles;
