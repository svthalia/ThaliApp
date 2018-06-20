import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  loginButton: {
    marginTop: 32,
    marginBottom: 16,
    width: 120,
    alignSelf: 'center',
  },
  loginButtonText: {
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    ios: {
      backgroundColor: Colors.white,
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
      marginLeft: 16,
      marginRight: 16,
    },
  },
  forgotpass: {
    alignSelf: 'center',
    color: Colors.darkGrey,
    marginBottom: 10,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    height: 25,
  },
  loginstatus: {
    marginTop: 10,
    marginBottom: 10,
    height: 25,
    fontSize: 20,
    alignSelf: 'center',
    color: Colors.white,
  },
  logo: {
    width: 260,
    height: 108,
    marginBottom: 48,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rootWrapper: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Colors.magenta,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
