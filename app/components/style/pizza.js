import { colors, create } from '../../style';

const styles = create({
  content: {
    flex: 1,
    padding: 8,
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
    fontFamily: 'sans-serif-medium',
    color: colors.textColour,
    fontSize: 14,
  },
  overview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 2,
    padding: 8,
    height: 100,
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
  },
  redBackground: {
    backgroundColor: colors.lightRed,
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
    borderRadius: 2,
    elevation: 2,
  },
  orderStatus: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
    color: colors.white,
    fontSize: 14,
    padding: 16,
    borderBottomWidth: 1,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
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
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerGrey,
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
