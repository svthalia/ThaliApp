import { create, colors } from '../../style';

const styles = create({
  eventView: {
    padding: 16,
    backgroundColor: colors.background,
  },
  locationImage: {
    height: 150,
    marginLeft: -16,
    marginRight: -16,
    marginTop: -16,
    marginBottom: 24,
  },
  titleText: {
    marginBottom: 16,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    fontSize: 20,
    lineHeight: 20.0,
    color: colors.darkGrey,
  },
  infoText: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '500',
    },
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
  registrationsTitle: {
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '500',
    },
    fontSize: 14,
    color: colors.darkGrey,
    marginBottom: 16,
  },
  registrationsView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  registrationsRow: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  registrationsItem: {
    flex: 1,
  },
  registrationsItemMargin: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  divider: {
    marginLeft: -16,
    marginRight: -16,
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'stretch',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: colors.dividerGrey,
  },
  italicText: {
    fontStyle: 'italic',
  },
});

export default styles;
