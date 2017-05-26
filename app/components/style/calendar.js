import { StyleSheet } from 'react-native';

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
    backgroundColor: colors.white,
  },
  sectionHeader: {
    backgroundColor: colors.white,
    fontSize: 22,
    padding: 10,
    paddingLeft: 20,
    color: colors.black,
  },
});

export default styles;
