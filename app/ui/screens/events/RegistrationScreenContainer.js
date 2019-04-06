import { connect } from 'react-redux';
import * as registrationActions from '../../../actions/registration';
import RegistrationScreen from './RegistrationScreen';
import * as navigationActions from '../../../actions/navigation';

const mapStateToProps = state => ({
  registration: state.registration.registration,
  fields: state.registration.fields,
  status: state.registration.status,
});

const mapDispatchToProps = {
  update: (registration, fields) => registrationActions.update(registration, fields),
  openUrl: url => navigationActions.openWebsite(url),
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
