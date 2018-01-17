import { colors, StyleSheet } from '../../style';
import { TOTAL_BAR_HEIGHT, STATUSBAR_HEIGHT } from './standardHeader';

export const HEADER_MIN_HEIGHT = TOTAL_BAR_HEIGHT;
export const HEADER_MAX_HEIGHT = 200 + STATUSBAR_HEIGHT;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    marginBottom: 10,
    ios: {
      borderRadius: 4,
      borderColor: colors.lightGray,
      borderStyle: 'solid',
      borderWidth: 0.5,
    },
    android: {
      elevation: 2,
      borderRadius: 2,
    },
  },
  profileText: {
    ios: {
      borderRadius: 4,
    },
  },
  item: {
    padding: 16,
  },
  borderTop: {
    borderTopColor: colors.dividerGrey,
    borderTopWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  data: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  url: {
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    backgroundColor: colors.background,
    fontSize: 14,
    color: colors.textColour,
    marginLeft: 18,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  marginTop: {
    marginTop: 10,
  },
  italics: {
    fontStyle: 'italic',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.magenta,
    overflow: 'hidden',
    elevation: 4,
  },
  appBar: {
    backgroundColor: colors.transparent,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    android: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    ios: {
      borderStyle: 'solid',
      borderBottomColor: colors.darkMagenta,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
  },
  content: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  icon: {
    fontSize: 24,
    marginTop: ((HEADER_MIN_HEIGHT - 24) + STATUSBAR_HEIGHT) / 2,
    color: colors.white,
    android: {
      marginLeft: 16,
    },
    ios: {
      marginLeft: 10,
    },
  },
  title: {
    color: colors.white,
    position: 'absolute',
    width: '100%',
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      fontFamily: 'System',
      fontWeight: '600',
    },
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  overlayGradient: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  errorText: {
    marginTop: HEADER_MIN_HEIGHT,
  },
});

export default styles;
