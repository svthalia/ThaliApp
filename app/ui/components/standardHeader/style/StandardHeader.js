import { Platform, StatusBar } from 'react-native';

import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const TOTAL_BAR_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: Colors.magenta,
    android: {
      elevation: 4,
    },
  },
  appBar: {
    backgroundColor: Colors.magenta,
    height: APPBAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    android: {
      height: APPBAR_HEIGHT,
      elevation: 4,
    },
    ios: {
      borderStyle: 'solid',
      borderBottomColor: Colors.darkMagenta,
      borderBottomWidth: 1,
    },
  },
  title: {
    color: Colors.white,
    android: {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      position: 'absolute',
      left: 40,
      right: 40,
      zIndex: 0,
      textAlign: 'center',
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  iconButton: {
    zIndex: 2,
  },
  icon: {
    android: {
      paddingLeft: 20,
      paddingRight: 32,
    },
    ios: {
      paddingLeft: 10,
      paddingRight: 16,
    },
    color: Colors.white,
  },
  rightView: {
    position: 'absolute',
    right: 0,
  },
});

export default styles;
