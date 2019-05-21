import { connect } from 'react-redux';
import * as welcomeActions from '../../../actions/welcome';
import WelcomeScreen from './WelcomeScreen';

const mapStateToProps = state => ({
  eventList: state.welcome.eventList,
  loading: state.welcome.loading,
  status: state.welcome.status,
});

const mapDispatchToProps = {
  refresh: welcomeActions.refresh,
};

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen);
