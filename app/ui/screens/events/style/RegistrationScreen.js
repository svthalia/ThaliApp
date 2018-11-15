import { APPBAR_HEIGHT, TOTAL_BAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';
import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.semiTransparent,
    android: {
      marginTop: APPBAR_HEIGHT,
    },
    ios: {
      marginTop: TOTAL_BAR_HEIGHT,
    },
  },
  fieldContainer: {
    borderTopWidth: 1,
    borderTopColor: Colors.dividerGrey,
    padding: 16,
  },
  booleanContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    color: Colors.textColour,
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
    color: Colors.lightRed,
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
