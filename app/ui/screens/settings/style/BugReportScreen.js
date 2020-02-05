import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },
  fieldContainer: {
    padding: 16,
    ios: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  borderTop: {
    borderTopColor: Colors.dividerGrey,
    borderTopWidth: 1,
  },
  fieldText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    ios: {
      paddingTop: 12,
      paddingBottom: 12,
    },
  },
  label: {
    color: Colors.textColour,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  textContainer: {
    flex: 8,
  },
  fieldInput: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: Colors.textColour,
    height: 100,
  },
  fieldInputLine: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: Colors.textColour,
    marginBottom: 20,
  },
  buttonView: {
    margin: 16,
    marginBottom: 0,
  },
});

export default styles;
