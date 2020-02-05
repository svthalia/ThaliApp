import { connect } from 'react-redux';
import { settingsActions, bugReportActions } from '../../../actions/settings';
import SettingsScreen from './SettingsScreen';

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

const mapDispatchToProps = {
  init: settingsActions.initStart,
  openReportBug: bugReportActions.open,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
