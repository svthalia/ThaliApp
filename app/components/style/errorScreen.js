import { colors, StyleSheet } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
    resizeMode: 'contain',
  },
  text: {
    android: {
      fontFamily: 'sans-serif-regular',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    fontSize: 16,
    color: colors.gray,
    textAlign: 'center',
  },
});

export default styles;
