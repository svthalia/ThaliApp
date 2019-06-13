import { connect } from 'react-redux';
import * as navigationActions from '../../../actions/navigation';
import * as profileActions from '../../../actions/profile';
import ProfileScreen from './ProfileScreen';

const mapStateToProps = state => ({
  profile: state.profile.profile,
  success: state.profile.success,
  hasLoaded: state.profile.hasLoaded,
  userPk: state.session.pk,
});

const mapDispatchToProps = {
  goBack: navigationActions.goBack,
  openUrl: navigationActions.openWebsite,
  changeAvatar: profileActions.changeAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
