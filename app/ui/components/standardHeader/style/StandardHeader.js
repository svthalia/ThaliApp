import { Platform, StatusBar } from 'react-native';

import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const TOTAL_BAR_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

const styles = StyleSheet.create({
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
    android: {
      height: APPBAR_HEIGHT,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: 'wrap',
      elevation: 4,
    },
    ios: {
      borderStyle: 'solid',
      borderBottomColor: Colors.darkMagenta,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  title: {
    color: Colors.white,
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
    ios: {
      width: 24 + 16 + 10,
      height: 0,
    },
  },
});

export default styles;
