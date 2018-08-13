import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profile';
import MemberView from './MemberView';

const mapDispatchToProps = dispatch => ({
  loadProfile: pk => dispatch(profileActions.profile(pk)),
});

export default connect(() => ({}), mapDispatchToProps)(MemberView);
