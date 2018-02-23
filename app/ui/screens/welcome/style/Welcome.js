import { Dimensions } from 'react-native';

import { TOTAL_BAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';
import colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionList: {
    backgroundColor: colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    android: {
      paddingTop: 11,
      paddingBottom: 11,
    },
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
