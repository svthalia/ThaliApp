import { connect } from 'react-redux';
import { bugReportActions } from '../../../actions/settings';
import BugReportScreen from './BugReportScreen';

const mapDispatchToProps = {
  reportBug: bugReportActions.reportBug,
};

export default connect(() => ({}), mapDispatchToProps)(BugReportScreen);
