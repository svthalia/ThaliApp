import { StyleSheet, Dimensions } from 'react-native';

import { TOTAL_BAR_HEIGHT } from './navigator';
import { colors } from '../../style';

const styles = StyleSheet.create({
  day: {
    flex: 1,
    flexDirection: 'row',
  },
  dateInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    padding: 10,
  },
  dayNumber: {
    fontSize: 28,
  },
  dayOfWeek: {
    fontSize: 18,
  },
  eventList: {
    flex: 7,
  },
  sectionList: {
    backgroundColor: colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
  },
  sectionHeader: {
    backgroundColor: colors.background,
    fontSize: 22,
    padding: 10,
    paddingLeft: 20,
    color: colors.textColour,
  },
});

export default styles;
