import { colors, create } from '../../style';

const styles = create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    android: {
      fontFamily: 'sans-serif-regular',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    fontSize: 18,
    color: colors.textColour,
    textAlign: 'center',
  },
});

export default styles;
