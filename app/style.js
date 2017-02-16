import { StyleSheet } from 'react-native';

const magenta = '#E62272';
const white = '#FFFFFF';
const black = '#000000';

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: white,
  },
  header: {
    backgroundColor: magenta,
    color: white,
    fontWeight: 'bold',
    padding: 20,
  },
  button: {
    backgroundColor: white,
    color: black,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
});

export default styles;
