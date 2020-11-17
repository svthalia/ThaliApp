import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  floatingActionButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: Colors.grey,
    android: {
      elevation: 4,
    },
    ios: {
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
  floatingActionButtonWrapper: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.magenta,
  },
});

export default styles;
