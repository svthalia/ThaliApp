import { Platform, StyleSheet } from 'react-native';

import { colors } from '../../style';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: colors.darkMagenta,
  },
  appBar: {
    backgroundColor: colors.magenta,
    height: APPBAR_HEIGHT,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    elevation: 4
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontFamily: 'sans-serif-medium'
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 32,
    color: colors.white,
  },
});

export default styles;
