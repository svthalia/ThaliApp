import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import MemberView from '../../components/memberView/MemberViewConnector';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import SearchHeader from '../../components/searchHeader/SearchHeaderConnector';

import styles, { memberSize } from './style/MemberList';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';

class MemberListScreen extends Component {
  componentDidMount = () => {
    const { searchKey } = this.props;
    this.props.loadMembers(searchKey);
  };

  handleRefresh = () => {
    const { searchKey } = this.props;
    this.props.loadMembers(searchKey);
  };

  handleEndReached = () => {
    const { more, loadMoreMembers } = this.props;
    if (more !== null) {
      loadMoreMembers(more);
    }
  };

  search = (searchKey) => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.props.loadMembers(searchKey);
    }, 500);
  };

  render() {
    const header = (
      <SearchHeader
        title={this.props.t('Member List')}
        searchText={this.props.t('Find a member')}
        search={this.search}
        searchKey={this.props.searchKey}
      />
    );

    let content = (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.container}
        onRefresh={this.handleRefresh}
        refreshing={this.props.loading}
        onEndReachedThreshold={0.5}
        onEndReached={this.handleEndReached}
        data={this.props.memberList}
        renderItem={item => (
          <MemberView
            key={item.item.pk}
            member={{
              pk: item.item.pk,
              photo: item.item.avatar.medium,
              name: item.item.display_name,
            }}
            style={styles.memberView}
            size={memberSize}
          />
        )}
        keyExtractor={item => item.pk}
        numColumns={3}
      />
    );

    if (this.props.status === 'initial') {
      content = (<LoadingScreen />);
    } else if (this.props.status === 'failure') {
      content = (<ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />);
    } else if (this.props.memberList.length === 0) {
      content = (<ErrorScreen message={this.props.t('Couldn\'t find any members...')} />);
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

MemberListScreen.defaultProps = {
  more: null,
};

MemberListScreen.propTypes = {
  memberList: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    avatar: PropTypes.shape({
      full: PropTypes.string.isRequired,
      large: PropTypes.string.isRequired,
      medium: PropTypes.string.isRequired,
      small: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  more: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  loadMembers: PropTypes.func.isRequired,
  loadMoreMembers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('screens/memberList/MemberListScreen')(MemberListScreen);
