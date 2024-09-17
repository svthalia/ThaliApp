import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  rootWrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.background,
  },
  borderTop: {
    borderTopColor: Colors.dividerGrey,
    borderTopWidth: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    color: Colors.textColour,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  name: {
    flex: 1,
  },
  itemControls: {
    flex: 1,
    flexDirection: 'row',
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
  },
  label: {
    fontSize: 12,
  },
  selectContainer: {
    flex: 1,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
  },
  buttonTextContainer: {
    padding: 8,
    ios: {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  buttonMargin: {
    marginTop: 4,
  },
  selected: {
    backgroundColor: Colors.magenta,
  },
  noResultsMessage: {
    fontSize: 18,
    padding: 16,
  },
});

export default styles;
