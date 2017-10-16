import { Dimensions } from 'react-native';

import { TOTAL_BAR_HEIGHT } from './navigator';
import { colors, create } from '../../style';

const styles = create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionList: {
    backgroundColor: colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    paddingTop: 11,
    paddingBottom: 11,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 16,
    color: colors.textColour,
    padding: 16,
  },
  footer: {
    alignSelf: 'center',
    marginTop: 11,
    marginBottom: 16,
    padding: 10,
  },
  footerText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: colors.darkMagenta,
  },
});

export default styles;
