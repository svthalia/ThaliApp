import { StyleSheet } from 'react-native';

import { APPBAR_HEIGHT } from './standardHeader';
import { colors } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: APPBAR_HEIGHT,
    backgroundColor: colors.semiTransparent,
  },
  fieldContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.dividerGrey,
    padding: 16,
  },
  booleanContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.dividerGrey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  field: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.textColour,
  },
  invalid: {
    fontFamily: 'sans-serif-medium',
    fontSize: 12,
    color: colors.lightRed,
    marginLeft: 4,
  },
  buttonView: {
    margin: 16,
  },
});

export default styles;
