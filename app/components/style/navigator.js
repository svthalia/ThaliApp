import { Platform } from 'react-native';

import { colors, create } from '../../style';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

export const TOTAL_BAR_HEIGHT = APPBAR_HEIGHT + 20;

const styles = create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    android: {
      backgroundColor: colors.darkMagenta,
    },
    ios: {
      backgroundColor: colors.magenta,
    },
  },
  appBar: {
    backgroundColor: colors.magenta,
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
      borderBottomColor: colors.darkMagenta,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
  title: {
    color: colors.white,
    android: {
      fontSize: 20,
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontSize: 18,
      fontFamily: 'System',
      fontWeight: '600',
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
    color: colors.white,
  },
  rightView: {
    ios: {
      width: 24 + 16 + 10,
      height: 0,
    },
  },
  flex: {
    flex: 1,
  },
});

export default styles;
