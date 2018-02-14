import { colors, StyleSheet } from '../../style';

import { STATUSBAR_HEIGHT } from './standardHeader';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: colors.magenta,
  },
});

export default styles;
