import { StyleSheet, Dimensions } from 'react-native';

const magenta = '#E62272';
const deviceWidth = Dimensions.get('window').width;
const deviceHeigth = Dimensions.get('window').heigth;
const margin = 10;

const styles = StyleSheet.create({
  body: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  bodyText: {
    fontFamily: 'opensans',
  },
  textInput: {
    alignSelf: 'stretch',
  },
  logo: {
    width: deviceWidth - margin,
    resizeMode: 'contain',
  },
  button: {
    color: magenta,
  },
});

export { styles };
