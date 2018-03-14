import { APPBAR_HEIGHT, TOTAL_BAR_HEIGHT } from './standardHeader';
import { colors, StyleSheet } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.semiTransparent,
    android: {
      marginTop: APPBAR_HEIGHT,
    },
    ios: {
      marginTop: TOTAL_BAR_HEIGHT,
    },
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
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: colors.textColour,
  },
  invalid: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 12,
    color: colors.lightRed,
    marginLeft: 4,
  },
  buttonView: {
    margin: 16,
    marginBottom: 32,
  },
  submitButton: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  rootWrapper: {
    flex: 1,
  },
});

export default styles;
