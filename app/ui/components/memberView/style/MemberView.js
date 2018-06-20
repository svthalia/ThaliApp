import { StyleSheet } from 'react-native';
import Colors from '../../../style/Colors';

const styles = StyleSheet.create({
  nameText: {
    fontSize: 11,
    color: Colors.white,
    position: 'absolute',
    left: 6,
    bottom: 4,
    right: 6,
    backgroundColor: Colors.transparent,
  },
  image: {
    flex: 1,
  },
  overlayGradient: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.6,
  },
});

export default styles;
