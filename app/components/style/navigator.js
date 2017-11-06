import { colors, create } from '../../style';

import { STATUSBAR_HEIGHT } from './standardHeader';

const styles = create({
  flex: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
    backgroundColor: colors.magenta,
  },
});

export default styles;
