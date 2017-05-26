import { StyleSheet } from 'react-native';
import { colors } from '../../style';

const styles = StyleSheet.create({
  nameText: {
    fontSize: 11,
    color: colors.white,
    position: 'absolute',
    left: 6,
    bottom: 4,
    right: 6,
  },
  image: {
    flex: 1,
  },
});

export default styles;
