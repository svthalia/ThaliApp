import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  sectionHeader: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.textColour,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  card: {
    backgroundColor: Colors.white,
    elevation: 2,
    android: {
      borderRadius: 2,
    },
    ios: {
      borderRadius: 4,
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
});

export default styles;
