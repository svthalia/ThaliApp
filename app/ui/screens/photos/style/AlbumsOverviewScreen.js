import { Dimensions } from 'react-native';
import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';
import { TOTAL_BAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  listContainer: {
    padding: 16,
  },
  flatList: {
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    paddingBottom: 16,
  },
  listItem: {
    marginRight: 8,
    marginBottom: 16,
  },
  errorScreen: {
    flex: 1,
  },
});
