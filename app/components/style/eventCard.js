import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  card: {
    padding: 20,
  },
  registered: {
    backgroundColor: colors.magenta,
  },
  unregistered: {
    backgroundColor: colors.gray,
  },
  eventTitle: {
    fontWeight: 'bold',
    color: colors.white,
  },
  eventInfo: {
    color: colors.white,
  },
});

export default styles;
