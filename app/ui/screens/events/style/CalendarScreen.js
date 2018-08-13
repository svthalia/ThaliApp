import { Dimensions } from 'react-native';

import { TOTAL_BAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';
import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  day: {
    flex: 1,
    flexDirection: 'row',
  },
  dateInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  dayNumber: {
    fontSize: 28,
  },
  dayOfWeek: {
    fontSize: 16,
  },
  eventList: {
    flex: 7,
  },
  sectionList: {
    backgroundColor: Colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
  },
  sectionHeader: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    backgroundColor: Colors.background,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    color: Colors.textColour,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 16,
  },
});

export default styles;
