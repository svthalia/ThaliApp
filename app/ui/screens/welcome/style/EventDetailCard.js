import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    elevation: 2,
    padding: 16,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    ios: {
      borderRadius: 4,
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
    android: {
      borderRadius: 2,
    },
  },
  eventTitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black,
    opacity: 0.8,
  },
  eventInfo: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black,
    opacity: 0.5,
  },
  description: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black,
    opacity: 0.8,
    marginTop: 8,
  },
  buttonList: {
    flexDirection: 'row',
    marginTop: 28,
  },
  button: {
    marginRight: 28,
  },
  moreInfo: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: Colors.black,
    opacity: 0.5,
  },
  orderPizza: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    fontSize: 14,
    color: Colors.darkMagenta,
  },
  indicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  indicatorMargin: {
    marginRight: 32,
  },
  registered: {
    backgroundColor: Colors.magenta,
  },
  unregistered: {
    backgroundColor: Colors.grey,
  },
});

export default styles;
