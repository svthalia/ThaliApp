import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  floatingActionButtonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingActionButtonItemIcon: {
    backgroundColor: Colors.magenta,
    width: 46,
    height: 46,
    marginLeft: 14,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  floatingActionButtonItemTextWrapper: {
    backgroundColor: Colors.magenta,
    paddingHorizontal: 10,
    elevation: 5,
    borderRadius: 6,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingActionButtonItemText: {
    color: Colors.white,
    fontSize: 16,
  },
});

export default styles;
