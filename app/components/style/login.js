import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({

  loginText: {
    color: colors.white,
    fontWeight: 'bold',
  },

  blackbutton: {
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: 225,
    height: 50,
    backgroundColor: colors.darkGrey,
    justifyContent: 'center',
  },
  input: {
    height: 48,
  },

  forgotpass: {
    alignSelf: 'center',
    color: colors.darkGrey,
    marginBottom: 10,
    fontSize: 20,
    height: 25,
    fontWeight: 'bold',
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
    marginTop: 137,
    marginBottom: 54,
    height: 108,
    marginLeft: 34,
    marginRight: 34,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  wrapper: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: colors.magenta,
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
