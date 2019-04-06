import { connect } from 'react-redux';
import { settingsActions } from '../../../actions/settings';
import SettingsScreen from './SettingsScreen';

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

const mapDispatchToProps = {
  init: () => settingsActions.initStart(),
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
