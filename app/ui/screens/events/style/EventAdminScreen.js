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
  registration: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
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
  registrationControls: {
    flex: 1,
    flexDirection: 'row',
  },
  presenceContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 16,
  },
  label: {
    fontSize: 12,
  },
  paymentContainer: {
    flex: 1,
  },
  button: {
    flex: 1,
    margin: 2,
    padding: 8,
    backgroundColor: Colors.gray,
    borderRadius: 4,
    overflow: 'hidden',
    android: {
      elevation: 2,
    },
    ios: {
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
  },
  selected: {
    backgroundColor: Colors.magenta,
  },
  filterButton: {
    width: 56,
    height: 56,
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 28,
    backgroundColor: Colors.magenta,
    justifyContent: 'center',
    alignItems: 'center',
    android: {
      elevation: 4,
    },
    ios: {
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
  noResultsMessage: {
    fontSize: 18,
    padding: 16,
  },
});

export default styles;
