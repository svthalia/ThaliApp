import { connect } from 'react-redux';
import { settingsActions } from '../../../actions/settings';
import * as profileActions from '../../../actions/profile';
import * as welcomeActions from '../../../actions/welcome';
import * as calendarActions from '../../../actions/calendar';
import * as loginActions from '../../../actions/session';
import * as photosActions from '../../../actions/photos';
import * as membersActions from '../../../actions/members';
import Sidebar from './Sidebar';

const mapStateToProps = state => ({
  displayName: state.session.displayName,
  photo: state.session.photo,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(profileActions.profile()),
  openCalendar: () => dispatch(calendarActions.open()),
  openMemberList: () => dispatch(membersActions.members()),
  openWelcome: () => dispatch(welcomeActions.open()),
  openSettings: () => dispatch(settingsActions.open()),
  openPhotos: () => dispatch(photosActions.openAlbums()),
  signOut: () => dispatch(loginActions.signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
