import { Linking, Platform } from 'react-native';
import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import * as registrationActions from '../../../actions/registration';
import * as eventActions from '../../../actions/event';
import EventScreen from './EventScreen';

const mapStateToProps = state => ({
  data: state.event.data,
  registrations: state.event.registrations,
  status: state.event.status,
  loading: state.event.loading,
});

const mapDispatchToProps = dispatch => ({
  refresh: pk => dispatch(eventActions.event(pk)),
  register: event => dispatch(registrationActions.register(event)),
  cancel: registration => dispatch(registrationActions.cancel(registration)),
  fields: registration => dispatch(registrationActions.retrieveFields(registration)),
  openMaps: location => Linking.openURL(`https://maps.${Platform.OS === 'ios' ? 'apple' : 'google'}.com/maps?daddr=${location}`),
  retrievePizzaInfo: () => dispatch(pizzaActions.retrievePizzaInfo()),
  openAdmin: () => (dispatch(eventActions.admin())),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
