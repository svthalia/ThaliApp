import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
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
  buttonView: {
    margin: 16,
  },
});

export default styles;
