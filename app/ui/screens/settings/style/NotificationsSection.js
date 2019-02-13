import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
  borderTop: {
    borderTopColor: Colors.dividerGrey,
    borderTopWidth: 1,
  },
  textContainer: {
    flex: 8,
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
  description: {
    color: Colors.grey,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 12,
  },
  emptyText: {
    padding: 16,
  },
  settingsSwitch: {
    ios: {
      transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
    flex: 2,
  },
});

export default styles;
