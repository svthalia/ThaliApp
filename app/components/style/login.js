import { colors, create } from '../../style';

const styles = create({
  loginText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  blackbutton: {
    marginTop: 40,
    marginBottom: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 38,
    paddingRight: 38,
    borderRadius: 2,
    elevation: 2,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
  },
  input: {
    height: 48,
    ios: {
      backgroundColor: colors.white,
      borderRadius: 4,
      padding: 8,
      marginBottom: 8,
      marginLeft: 16,
      marginRight: 16,
    },
  },
  forgotpass: {
    alignSelf: 'center',
    color: colors.darkGrey,
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
    color: colors.white,
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
    backgroundColor: colors.magenta,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
