import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

import { STATUSBAR_HEIGHT } from '../../standardHeader/style/StandardHeader';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: Colors.magenta,
  },
});

export default styles;
