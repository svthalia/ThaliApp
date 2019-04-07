import { connect } from 'react-redux';
import * as profileActions from '../../../actions/profile';
import MemberView from './MemberView';

const mapDispatchToProps = {
  loadProfile: profileActions.profile,
};

export default connect(() => ({}), mapDispatchToProps)(MemberView);
