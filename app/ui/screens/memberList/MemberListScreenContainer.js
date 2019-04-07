import { connect } from 'react-redux';
import * as memberActions from '../../../actions/members';
import MemberList from './MemberListScreen';

const mapStateToProps = state => ({
  memberList: state.members.memberList,
  status: state.members.status,
  loading: state.members.loading,
  more: state.members.more,
  searchKey: state.members.searchKey,
});

const mapDispatchToProps = {
  loadMembers: (keywords = '') => memberActions.members(keywords),
  loadMoreMembers: memberActions.more,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberList);
