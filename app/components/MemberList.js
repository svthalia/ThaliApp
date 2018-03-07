import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import MemberView from './MemberView';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';
import SearchBar from './SearchHeader';
import * as memberActions from '../actions/members';

import styles, { memberSize } from './style/memberList';

class MemberList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount = () => {
    this.props.loadMembers(this.props.searchKey);
  };

  handleRefresh = () => {
    this.props.loadMembers(this.props.searchKey);
  };

  handleEndReached = () => {
    if (this.props.more !== null) {
      this.props.loadMoreMembers(this.props.more);
    }
  };

  render() {
    const header = (
      <SearchBar
        title={this.props.t('Member List')}
        searchText={this.props.t('Find a member')}
        search={key => this.props.loadMembers(key)}
        searchKey={this.props.searchKey}
      />
    );

    if (this.props.status === 'initial') {
      return (
        <View style={styles.wrapper}>
          {header}
          <LoadingScreen />
        </View>
      );
    } else if (this.props.status === 'failure') {
      return (
        <View style={styles.wrapper}>
          {header}
          <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />
        </View>
      );
    } else if (this.props.memberList.length === 0) {
      return (
        <View style={styles.wrapper}>
          {header}
          <ErrorScreen message={this.props.t('Couldn\'t find any members...')} />
        </View>
      );
    }

    return (
      <View style={styles.wrapper}>
        {header}
        <View>
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
        </View>
      </View>
    );
  }
}

MemberList.defaultProps = {
  more: null,
};

MemberList.propTypes = {
  memberList: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  more: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
  loadMembers: PropTypes.func.isRequired,
  loadMoreMembers: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  memberList: state.members.memberList,
  status: state.members.status,
  loading: state.members.loading,
  more: state.members.more,
  searchKey: state.members.searchKey,
});

const mapDispatchToProps = dispatch => ({
  loadMembers: (keywords = null) => dispatch(memberActions.members(keywords)),
  loadMoreMembers: url => dispatch(memberActions.more(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('memberList')(MemberList));
