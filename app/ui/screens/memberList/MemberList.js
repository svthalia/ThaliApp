import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import MemberView from '../../components/memberView/MemberView';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import SearchBar from './SearchHeader';
import * as memberActions from '../../../actions/members';

import styles, { memberSize } from './style/MemberList';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';

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

    let content = (<FlatList
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
    />);

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

export default connect(mapStateToProps, mapDispatchToProps)(translate('screens/memberList/MemberList')(MemberList));
