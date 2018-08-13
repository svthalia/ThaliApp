import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.background,
  },
  eventInfo: {
    padding: 8,
  },
  eventTitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.textColour,
    fontSize: 20,
    marginBottom: 8,
  },
  eventSubtitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.textColour,
    fontSize: 14,
  },
  overviewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    padding: 8,
    height: 100,
    android: {
      borderRadius: 2,
    },
    ios: {
      borderRadius: 4,
      borderColor: Colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
  overviewText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.white,
    fontSize: 32,
  },
  greenBackground: {
    backgroundColor: Colors.lightGreen,
    borderColor: Colors.darkGreen,
  },
  redBackground: {
    backgroundColor: Colors.lightRed,
    borderColor: Colors.darkRed,
  },
  overviewNoOrder: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.textColour,
    fontSize: 14,
    paddingLeft: 8,
    paddingTop: 6,
    paddingBottom: 6,
  },
  orderStatusText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.white,
    fontSize: 14,
  },
  orderStatus: {
    android: {
      borderTopRightRadius: 2,
      borderTopLeftRadius: 2,
    },
    ios: {
      borderTopRightRadius: 4,
      borderTopLeftRadius: 4,
    },
    padding: 16,
    borderBottomWidth: 1,
  },
  paidStatus: {
    backgroundColor: Colors.lightGreen,
    borderBottomColor: Colors.darkGreen,
  },
  notPaidStatus: {
    backgroundColor: Colors.lightRed,
    borderBottomColor: Colors.darkRed,
  },
  pizzaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: Colors.dividerGrey,
  },
  orderedPizzaContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  pizzaList: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  pizzaInfo: {
    flex: 1,
  },
  pizzaName: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.black,
    fontSize: 14,
  },
  pizzaDescription: {
    android: {
      fontFamily: 'sans-serif-regular',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '300',
    },
    color: Colors.gray,
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2,
  },
  pizzaPrice: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: Colors.magenta,
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.magenta,
    marginLeft: 16,
    android: {
      padding: 8,
      elevation: 2,
      borderRadius: 2,
    },
    ios: {
      padding: 12,
      borderRadius: 100,
    },
  },
});

export default styles;
