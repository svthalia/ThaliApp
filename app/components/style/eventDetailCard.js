import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 2,
    elevation: 2,
    padding: 16,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  eventTitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    opacity: 0.8
  },
  eventInfo: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    opacity: 0.5,
  },
  description: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    opacity: 0.8,
    marginTop: 8,
  },
  buttonList: {
    flexDirection: 'row',
    marginTop: 28,
  },
  button: {
    backgroundColor: colors.white,
  },
  moreInfo: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.black,
    opacity: 0.5,
  },
});

export default styles;
