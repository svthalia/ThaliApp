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
  },
  title: {
    color: colors.white,
    fontSize: 24,
  },
  icon: {
    paddingLeft: 20,
    paddingRight: 50,
    color: colors.white,
  },
});

export default styles;
