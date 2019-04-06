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

const mapDispatchToProps = {
  refresh: pk => eventActions.event(pk, false),
  updateRegistration: (pk, present, payment) => eventActions
    .updateRegistration(pk, present, payment),
  goBack: () => navigationActions.goBack(),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventAdminScreen);
