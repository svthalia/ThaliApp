import { colors, StyleSheet } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
    backgroundColor: colors.background,
  },
  eventInfo: {
    padding: 8,
  },
  title: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: colors.textColour,
    fontSize: 20,
    marginBottom: 8,
  },
  subtitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: colors.textColour,
    fontSize: 14,
  },
  overview: {
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
      borderColor: colors.lightGray,
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
    color: colors.white,
    fontSize: 32,
  },
  greenBackground: {
    backgroundColor: colors.lightGreen,
    borderColor: colors.darkGreen,
  },
  redBackground: {
    backgroundColor: colors.lightRed,
    borderColor: colors.darkRed,
  },
  section: {
    marginTop: 8,
    marginBottom: 8,
  },
  header: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: colors.textColour,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  card: {
    backgroundColor: colors.white,
    elevation: 2,
    android: {
      borderRadius: 2,
    },
    ios: {
      borderRadius: 4,
      borderColor: colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
  },
  orderStatusText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: colors.white,
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
    backgroundColor: colors.lightGreen,
    borderBottomColor: colors.darkGreen,
  },
  notPaidStatus: {
    backgroundColor: colors.lightRed,
    borderBottomColor: colors.darkRed,
  },
  pizzaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    android: {
      borderBottomWidth: 1,
      borderBottomColor: colors.dividerGrey,
    },
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
    color: colors.black,
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
    color: colors.gray,
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
    color: colors.magenta,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.magenta,
    padding: 8,
    marginLeft: 16,
    borderRadius: 2,
    elevation: 2,
  },
});

export default styles;
