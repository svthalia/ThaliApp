import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, View } from 'react-native';
import { STATUS_FAILURE, STATUS_INITIAL } from '../../../reducers/photos';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import styles from './style/AlbumDetailScreen';
import PhotoListItem from './PhotoListItem';
import StandardHeader from '../../components/standardHeader/StandardHeader';

const windowWidth = Dimensions.get('window').width;
export const itemSize = (windowWidth - 48) / 3;

const AlbumDetailScreen = ({
  t, fetching, status, photos, openGallery,
}) => {
  let content = (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={photos.filter(p => !p.hidden)}
        renderItem={
          data => (
            <PhotoListItem
              photo={data.item}
              size={itemSize}
              style={styles.listItem}
              onPress={() => openGallery(data.index)}
            />
          )
        }
        keyExtractor={item => item.pk}
        numColumns={3}
      />
    </View>
  );

  if (fetching && status === STATUS_INITIAL) {
    content = (<LoadingScreen />);
  } else if (!fetching && status === STATUS_FAILURE) {
    content = (
      <View style={styles.wrapper}>
        <ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />
      </View>
    );
  }

  return (
    <View style={styles.screenWrapper}>
      <StandardHeader />
      {content}
    </View>
  );
};

AlbumDetailScreen.propTypes = {
  openGallery: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PhotoListItem.propTypes.photo),
  t: PropTypes.func.isRequired,
};

AlbumDetailScreen.defaultProps = {
  photos: [],
};

export default AlbumDetailScreen;
