import { connect } from 'react-redux';
import { settingsActions } from '../../../actions/settings';
import * as profileActions from '../../../actions/profile';
import * as welcomeActions from '../../../actions/welcome';
import * as calendarActions from '../../../actions/calendar';
import * as loginActions from '../../../actions/session';
import * as membersActions from '../../../actions/members';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  displayName: state.session.displayName,
  photo: state.session.photo,
});

const mapToProps = {
  loadProfile: () => profileActions.profile(),
  openCalendar: () => calendarActions.open(),
  openMemberList: () => membersActions.members(),
  openWelcome: () => welcomeActions.open(),
  openSettings: () => settingsActions.open(),
  signOut: () => loginActions.signOut(),
};

export default connect(mapStateToProps, mapToProps)(Sidebar);
