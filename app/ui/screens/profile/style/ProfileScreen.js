import Colors from '../../../style/Colors';
import StyleSheet from '../../../style/StyleSheet';
import { TOTAL_BAR_HEIGHT, STATUSBAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';

export const HEADER_MIN_HEIGHT = TOTAL_BAR_HEIGHT;
export const HEADER_MAX_HEIGHT = 200 + STATUSBAR_HEIGHT;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
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
    borderTopColor: Colors.dividerGrey,
    borderTopWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: Colors.black,
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
    color: Colors.grey,
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
  italics: {
    fontStyle: 'italic',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.magenta,
    overflow: 'hidden',
    elevation: 4,
  },
  appBar: {
    backgroundColor: Colors.transparent,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    android: {
      justifyContent: 'flex-start',
      flexWrap: 'wrap',
    },
    ios: {
      borderStyle: 'solid',
      borderBottomColor: Colors.darkMagenta,
      borderBottomWidth: 1,
      justifyContent: 'space-between',
    },
  },
  content: {
    marginTop: HEADER_MAX_HEIGHT,
    padding: 8,
    paddingTop: 0,
  },
  icon: {
    fontSize: 24,
    marginTop: ((HEADER_MIN_HEIGHT - 24) + STATUSBAR_HEIGHT) / 2,
    color: Colors.white,
    android: {
      marginLeft: 16,
    },
    ios: {
      marginLeft: 10,
    },
  },
  title: {
    color: Colors.white,
    position: 'absolute',
    right: 8,
    android: {
      fontFamily: 'sans-serif-medium',
    },
    ios: {
      left: 8,
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
  touchableHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
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
