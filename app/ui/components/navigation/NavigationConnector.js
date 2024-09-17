import { connect } from 'react-redux';
import Navigation from './Navigation';
import { loggedInSelector } from '../../../selectors/session';

const mapStateToProps = (state) => ({
  loggedIn: loggedInSelector(state),
});

export default connect(mapStateToProps)(Navigation);
