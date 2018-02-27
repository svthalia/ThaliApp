import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, View } from 'react-native';
import { STATUS_FAILURE, STATUS_INITIAL } from '../../../reducers/photos';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import AlbumListItem from './AlbumListItem';
import styles from './style/AlbumsOverview';
import AlbumListItemContainer from './AlbumListItemContainer';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';

const windowWidth = Dimensions.get('window').width;
export const albumSize = (windowWidth - 48) / 3;

const AlbumsOverviewScreen = (props) => {
  const { t, fetching, status } = props;
  if (fetching && status === STATUS_INITIAL) {
    return <LoadingScreen />;
  }
  if (!fetching && status === STATUS_FAILURE) {
    return (
      <View style={styles.wrapper}>
        <ErrorScreen style={styles.errorScreen} message={t('Sorry! We couldn\'t load any data.')} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={props.albums}
        renderItem={
          ({ item }) => (
            <AlbumListItemContainer album={item} size={albumSize} style={styles.listItem} />
          )
        }
        keyExtractor={item => item.pk}
        numColumns={3}
      />
    </View>);
};


AlbumsOverviewScreen.propTypes = {
  fetching: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  albums: PropTypes.arrayOf(AlbumListItem.propTypes.album).isRequired,
  t: PropTypes.func.isRequired,
};

export default withStandardHeader(AlbumsOverviewScreen, true);
