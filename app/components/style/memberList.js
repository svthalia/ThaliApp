import { Dimensions } from 'react-native';

import { StyleSheet, colors } from '../../style';
import { TOTAL_BAR_HEIGHT } from './standardHeader';

const windowWidth = Dimensions.get('window').width;
export const memberSize = (windowWidth - 64) / 3;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
  },
  flatList: {
    backgroundColor: colors.background,
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
    color: colors.magenta,
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
  },
  disabled: {
    color: colors.darkGrey,
  },
});

export default styles;
