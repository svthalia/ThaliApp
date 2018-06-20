import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

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
    backgroundColor: Colors.gray,
  },
  registered: {
    backgroundColor: Colors.magenta,
  },
  partner: {
    backgroundColor: Colors.black,
  },
  eventTitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.white,
  },
  partnerEventTitle: {
    color: Colors.magenta,
  },
  eventInfo: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.white,
    opacity: 0.8,
  },
  partnerEventInfo: {
    color: Colors.magenta,
  },
});

export default styles;
