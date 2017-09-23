import { StyleSheet } from 'react-native';

import { colors } from '../../style';

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: colors.textColour,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
  },
  subtitle: {
    color: colors.textColour,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    fontStyle: 'italic',
  },
  name: {
    color: colors.textColour,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
  },
  price: {
    color: colors.textColour,
    fontFamily: 'sans-serif-medium',
  },
  description: {
    color: colors.textColour,
    fontFamily: 'sans-serif-medium',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: colors.magenta,
    borderRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontFamily: 'sans-serif-medium',
    color: colors.white,
    padding: 10,
  },
  pizzaCard: {
    elevation: 2,
    borderRadius: 2,
  },
  pizzaDetail: {
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  currentOrder: {
    elevation: 2,
    borderRadius: 2,
    padding: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  currentOrderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paidStatus: {
    fontFamily: 'sans-serif-medium',
    backgroundColor: colors.lightGreen,
    borderWidth: 1,
    borderColor: colors.darkGreen,
    color: colors.darkGreen,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  notPaidStatus: {
    fontFamily: 'sans-serif-medium',
    backgroundColor: colors.red,
    borderWidth: 1,
    borderColor: colors.white,
    color: colors.white,
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  finalOrder: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: colors.textColour,
    fontSize: 40,
  },
  redBackground: {
    backgroundColor: colors.red,
  },
  greenBackground: {
    backgroundColor: colors.lightGreen,
  },
  whiteText: {
    color: colors.white,
  },
  greenText: {
    color: colors.darkGreen,
  },
  disabled: {
    backgroundColor: colors.gray,
  },
});

export default styles;
