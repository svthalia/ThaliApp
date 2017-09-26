import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
  },
  eventInfo: {
    padding: 8,
  },
  title: {
    fontFamily: 'sans-serif-medium',
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
    fontFamily: 'sans-serif-medium',
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
    fontFamily: 'sans-serif-medium',
    color: colors.textColour,
    fontSize: 14,
    paddingLeft: 10,
    paddingTop: 6,
    paddingBottom: 6,
  },
  card: {
    elevation: 2,
    borderRadius: 2,
  },
  orderStatus: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
    fontSize: 14,
    padding: 16,
    borderBottomWidth: 1,
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    margin: 2,
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
    paddingRight: 8,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerGrey,
  },
  pizzaInfo: {
    flex: 1,
  },
  pizzaName: {
    fontFamily: 'sans-serif-medium',
    color: colors.black,
    fontSize: 14,
  },
  pizzaDescription: {
    fontFamily: 'sans-serif-medium',
    color: colors.gray,
    fontSize: 14,
    marginTop: 2,
    marginBottom: 2,
  },
  pizzaPrice: {
    fontFamily: 'sans-serif-medium',
    color: colors.magenta,
    fontSize: 14,
  },
  button: {
    backgroundColor: colors.magenta,
    padding: 8,
    margin: 8,
    borderRadius: 2,
    elevation: 2,
  },
});

export default styles;
