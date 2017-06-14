import { StyleSheet, Dimensions } from 'react-native';

import { TOTAL_BAR_HEIGHT } from './navigator';
import { colors } from '../../style';

const styles = StyleSheet.create({
  sectionList: {
    backgroundColor: colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    paddingTop: 11,
    paddingBottom: 11,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    fontFamily: 'sans-serif-medium',
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
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.darkMagenta,
  },
  indicatorView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default styles;
