import { connect } from 'react-redux';
import * as navigationActions from '../../../actions/navigation';
import ProfileScreen from './ProfileScreen';

const mapStateToProps = state => ({
  profile: state.profile.profile,
  success: state.profile.success,
  hasLoaded: state.profile.hasLoaded,
});

const mapDispatchToProps = {
  goBack: () => navigationActions.goBack(),
  openUrl: url => navigationActions.openWebsite(url),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
