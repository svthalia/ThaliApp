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
  refresh: pk => eventActions.event(pk),
  register: event => registrationActions.register(event),
  cancel: registration => registrationActions.cancel(registration),
  fields: registration => registrationActions.retrieveFields(registration),
  openMaps: location => this.openUrl(`https://maps.${Platform.OS === 'ios' ? 'apple' : 'google'}.com/maps?daddr=${location}`),
  openUrl: url => navigationActions.openWebsite(url),
  retrievePizzaInfo: () => pizzaActions.retrievePizzaInfo(),
  openAdmin: () => eventActions.admin(),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
