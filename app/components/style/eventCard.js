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
    backgroundColor: colors.gray,
  },
  registered: {
    backgroundColor: colors.magenta,
  },
  partner: {
    backgroundColor: colors.black,
  },
  eventTitle: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
  },
  partnerEventTitle: {
    color: colors.magenta,
  },
  eventInfo: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
    opacity: 0.8,
  },
  partnerEventInfo: {
    color: colors.magenta,
  },
});

export default styles;
