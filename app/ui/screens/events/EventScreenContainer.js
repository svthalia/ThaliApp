import { Platform } from 'react-native';
import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import * as registrationActions from '../../../actions/registration';
import * as eventActions from '../../../actions/event';
import EventScreen from './EventScreen';
import * as navigationActions from '../../../actions/navigation';

const mapStateToProps = state => ({
  data: state.event.data,
  registrations: state.event.registrations,
  status: state.event.status,
  loading: state.event.loading,
});

const mapDispatchToProps = {
  refresh: eventActions.event,
  register: registrationActions.register,
  cancel: registrationActions.cancel,
  fields: registrationActions.retrieveFields,
  openMaps: location => this.openUrl(`https://maps.${Platform.OS === 'ios' ? 'apple' : 'google'}.com/maps?daddr=${location}`),
  openUrl: navigationActions.openWebsite,
  retrievePizzaInfo: pizzaActions.retrievePizzaInfo,
  openAdmin: eventActions.admin,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
