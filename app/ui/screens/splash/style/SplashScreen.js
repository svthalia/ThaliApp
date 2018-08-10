import Stylesheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

const styles = Stylesheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.magenta,
  },
  logo: {
    width: 260,
    height: 108,
    marginBottom: 72,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default styles;
