import { Dimensions } from 'react-native';
import StyleSheet from '../../../style/StyleSheet';
import Colors from '../../../style/Colors';
import { TOTAL_BAR_HEIGHT, STATUSBAR_HEIGHT, APPBAR_HEIGHT } from '../../../components/standardHeader/style/StandardHeader';

const MARGIN_TOP = STATUSBAR_HEIGHT + ((APPBAR_HEIGHT - 24) / 2);

export default StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  wrapper: {
    height: Dimensions.get('window').height - TOTAL_BAR_HEIGHT,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.background,
  },
  closeGalleryTouchable: {
    android: {
      left: 20,
    },
    ios: {
      left: 10,
    },
    position: 'absolute',
    marginTop: MARGIN_TOP,
  },
  downloadPhotoTouchable: {
    android: {
      right: 48 + 10,
    },
    ios: {
      right: 10,
    },
    position: 'absolute',
    marginTop: MARGIN_TOP,
  },
  sharePhotoTouchable: {
    android: {
      right: 20,
    },
    ios: {
      right: 10,
    },
    position: 'absolute',
    marginTop: MARGIN_TOP,
  },
  galleryWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.black,
  },
  listContainer: {
    padding: 16,
    paddingRight: 8,
  },
  flatList: {
    paddingBottom: 16,
  },
  listItem: {
    marginRight: 8,
    marginBottom: 8,
  },
});
