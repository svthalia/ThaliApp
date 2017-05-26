import { create, colors } from '../../style';

const styles = create({
  eventView: {
    padding: 16,
  },
  titleText: {
    marginBottom: 16,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    lineHeight: 20.0,
    color: colors.darkGrey,
  },
  infoText: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    lineHeight: 22.0,
    color: colors.darkGrey,
  },
  registrationText: {
    marginTop: 16,
  },
  registrationActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  secondButtonMargin: {
    marginLeft: 16,
  },
  descText: {
    fontSize: 14,
    lineHeight: 24.0,
    color: colors.black,
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: colors.dividerGrey,
  },
  italicText: {
    fontStyle: 'italic',
  },
});

export default styles;
