import { connect } from 'react-redux';
import { notificationsSettingsActions } from '../../../actions/settings';
import NotificationsSection from './NotificationsSection';

const mapStateToProps = state => ({
  categoryList: state.settings.pushNotifications.categoryList,
  status: state.settings.pushNotifications.status,
});

const mapDispatchToProps = dispatch => ({
  saveCategories: catList => dispatch(notificationsSettingsActions.saveCategories(catList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsSection);
