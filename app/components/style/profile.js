import { StyleSheet } from 'react-native';

import { colors } from '../../style';
import { APPBAR_HEIGHT } from './navigator';

export const HEADER_MIN_HEIGHT = APPBAR_HEIGHT;
export const HEADER_MAX_HEIGHT = 200;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 2,
    elevation: 2,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  item: {
    padding: 16,
    backgroundColor: colors.white,
  },
  borderTop: {
    borderTopColor: colors.dividerGrey,
    borderTopWidth: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.black,
    fontFamily: 'sans-serif-medium',
  },
  data: {
    fontSize: 14,
    lineHeight: 24,
    color: colors.gray,
    fontFamily: 'sans-serif-medium',
  },
  url: {
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    backgroundColor: colors.background,
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: colors.textColour,
    marginLeft: 18,
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  content: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  icon: {
    fontSize: 24,
    marginLeft: 16,
    marginTop: (HEADER_MIN_HEIGHT - 24) / 2,
    color: colors.white,
  },
  title: {
    color: colors.white,
    fontFamily: 'sans-serif-medium',
    position: 'absolute',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  overlayGradient: {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.3,
  },
  errorText: {
    marginTop: HEADER_MIN_HEIGHT,
  },
});

export default styles;
