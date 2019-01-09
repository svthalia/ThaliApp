import { connect } from 'react-redux';
import * as eventActions from '../../../actions/event';
import * as navigationActions from '../../../actions/navigation';
import EventAdminScreen from './EventAdminScreen';

const mapStateToProps = state => ({
  registrations: state.event.registrations,
  event: state.event.data.pk,
  status: state.event.status,
  loading: state.event.loading,
});

const mapDispatchToProps = dispatch => ({
  refresh: pk => dispatch(eventActions.event(pk, false)),
  updateRegistration: (pk, present, payment) => dispatch(
    eventActions.updateRegistration(pk, present, payment),
  ),
  goBack: () => dispatch(navigationActions.goBack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventAdminScreen);
