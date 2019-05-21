import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import * as actions from '../../../actions/session';
import LoginScreen from './LoginScreen';
import * as navigationActions from '../../../actions/navigation';

const mapStateToProps = state => state.session;
const mapDispatchToProps = {
  login: (username, password) => {
    Keyboard.dismiss();
    return actions.signIn(username, password);
  },
  openUrl: navigationActions.openWebsite,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
