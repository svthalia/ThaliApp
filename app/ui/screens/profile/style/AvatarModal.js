import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';

const styles = StyleSheet.create({
  background: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.modalBackground,
    width: '100%',
    height: '100%',
  },
  image: {
    width: '90%',
    height: '60%',
    resizeMode: 'contain',
  },
  buttonLayout: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '90%',
  },
  button: {
    flex: 1,
    fontSize: 24,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default styles;
