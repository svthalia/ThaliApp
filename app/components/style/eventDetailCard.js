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
    opacity: 0.8,
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
    marginRight: 28,
  },
  moreInfo: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.black,
    opacity: 0.5,
  },
  orderPizza: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.darkMagenta,
  },
  indicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  registered: {
    backgroundColor: colors.magenta,
  },
  unregistered: {
    backgroundColor: colors.gray,
  },
});

export default styles;
