import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, FlatList, View } from 'react-native';
import { STATUS_FAILURE, STATUS_INITIAL } from '../../../reducers/photos';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import AlbumListItem from './AlbumListItem';
import styles from './style/AlbumsOverviewScreen';
import SearchHeader from '../../components/searchHeader/SearchHeaderConnector';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';

const windowWidth = Dimensions.get('window').width;
const numColumns = 2;
export const albumSize = (windowWidth - 48) / numColumns;

class AlbumsOverviewScreen extends Component {
  handleRefresh = () => {
    const { keywords, loadAlbums } = this.props;
    loadAlbums(keywords);
  };

  handleEndReached = () => {
    const {
      keywords, next, loadAlbums, fetching,
    } = this.props;
    if (!fetching && next !== null) {
      loadAlbums(keywords, next);
    }
  };

  search = (keywords) => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.props.loadAlbums(keywords);
    }, 500);
  };

  render() {
    const {
      t, fetching, status, openAlbum, albums, keywords,
    } = this.props;

    const header = (
      <SearchHeader
        title={t('Photos')}
        searchText={t('Find an album')}
        search={this.search}
        searchKey={keywords}
      />
    );

    let content = (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.listContainer}
        data={albums}
        renderItem={
          ({ item }) => (
            <AlbumListItem
              album={item}
              size={albumSize}
              style={styles.listItem}
              onPress={openAlbum}
            />
          )
        }
        keyExtractor={(item) => item.pk}
        numColumns={numColumns}
        onRefresh={this.handleRefresh}
        refreshing={fetching}
        onEndReachedThreshold={0.5}
        onEndReached={this.handleEndReached}
      />
    );

    if (fetching && status === STATUS_INITIAL) {
      content = (<LoadingScreen />);
    } else if (!fetching && status === STATUS_FAILURE) {
      content = (<ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />);
    } else if (albums.length === 0) {
      content = (<ErrorScreen message={t('Couldn\'t find any albums...')} />);
    }

    return (
      <View style={styles.wrapper}>
        {header}
        <DismissKeyboardView contentStyle={styles.keyboardView}>
          {content}
        </DismissKeyboardView>
      </View>
    );
  }
}

AlbumsOverviewScreen.defaultProps = {
  next: null,
  keywords: undefined,
};

AlbumsOverviewScreen.propTypes = {
  fetching: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  albums: PropTypes.arrayOf(AlbumListItem.propTypes.album).isRequired,
  openAlbum: PropTypes.func.isRequired,
  loadAlbums: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  next: PropTypes.string,
};

export default AlbumsOverviewScreen;
