import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profile';
import MemberView from './MemberView';

const mapDispatchToProps = {
  loadProfile: pk => profileActions.profile(pk),
};

export default connect(() => ({}), mapDispatchToProps)(MemberView);
