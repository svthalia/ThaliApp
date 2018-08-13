import { connect } from 'react-redux';
import { Keyboard } from 'react-native';
import * as actions from '../../../actions/session';
import LoginScreen from './LoginScreen';

const mapStateToProps = state => state.session;
const mapDispatchToProps = dispatch => ({
  login: (username, password) => {
    Keyboard.dismiss();
    dispatch(actions.signIn(username, password));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
