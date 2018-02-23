import { Dimensions } from 'react-native';

import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';
import { TOTAL_BAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';

const windowWidth = Dimensions.get('window').width;
export const memberSize = (windowWidth - 64) / 3;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  container: {
    padding: 16,
  },
  flatList: {
    backgroundColor: Colors.background,
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    paddingBottom: 16,
  },
  memberView: {
    marginRight: 16,
    marginBottom: 16,
  },
  buttonList: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  button: {
    color: Colors.magenta,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 18,
  },
  disabled: {
    color: Colors.darkGrey,
  },
  keyboardView: {
    flex: 1,
  },
});

export default styles;
