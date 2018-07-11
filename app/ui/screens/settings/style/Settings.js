import Colors from '../../../style/Colors';
import Stylesheet from '../../../style/StyleSheet';

const styles = Stylesheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  menuItem: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.textColour,
    fontSize: 14,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});

export default styles;
