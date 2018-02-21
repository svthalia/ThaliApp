import { colors, StyleSheet } from '../../style';

const styles = StyleSheet.create({
  container: {
    android: {
      borderRadius: 2,
    },
    ios: {
      borderRadius: 100,
      paddingLeft: 12,
      paddingRight: 12,
    },
    padding: 10,
  },
  disabled: {
    android: {
      elevation: 0,
    },
    opacity: 0.8,
  },
  text: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    color: colors.white,
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
  },
  touchable: {
    android: {
      borderRadius: 2,
      elevation: 4,
    },
    ios: {
      borderRadius: 100,
    },
  },
});

export default styles;

