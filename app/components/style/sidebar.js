import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'stretch',
  },
  headerButton: {
    flex: 1,
  },
  headerImage: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nameField: {
    color: colors.white,
    fontSize: 24,
  },
  buttonList: {
    flex: 3,
  },
  buttonIcon: {
    marginRight: 30,
    width: 28,
    textAlign: 'center',
  },
  buttonText: {
    padding: 20,
  },
});

export default styles;
