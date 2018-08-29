import { connect } from 'react-redux';
import * as registrationActions from '../../../actions/registration';
import RegistrationScreen from './RegistrationScreen';

const mapStateToProps = state => ({
  registration: state.registration.registration,
  fields: state.registration.fields,
  status: state.registration.status,
});

const mapDispatchToProps = dispatch => ({
  update: (registration, fields) => dispatch(registrationActions.update(registration, fields)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
