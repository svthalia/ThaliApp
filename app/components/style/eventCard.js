import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  button: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 2,
  },
  card: {
    padding: 16,
    borderRadius: 2,
  },
  registered: {
    backgroundColor: colors.magenta,
  },
  unregistered: {
    backgroundColor: colors.gray,
  },
  eventTitle: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
  },
  eventInfo: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
    opacity: 0.8,
  },
});

export default styles;
