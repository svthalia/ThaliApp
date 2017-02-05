import {StyleSheet, Dimensions} from 'react-native';

let magenta = '#E62272';
let deviceWidth = Dimensions.get('window').width;
let deviceHeigth = Dimensions.get('window').heigth;
let margin = 10;

const styles = StyleSheet.create({
  body : {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  bodyText: {
    fontFamily: 'opensans',
  },
  textInput: {
    alignSelf: 'stretch'
  },
  logo: {
    width: deviceWidth - margin,
    resizeMode: 'contain'
  },
  button: {
    color: magenta
  }
});

export {styles};
