import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import * as eventActions from '../../../actions/event';
import EventDetailCard from './EventDetailCard';

const mapDispatchToProps = {
  loadEvent: eventActions.event,
  retrievePizzaInfo: pizzaActions.retrievePizzaInfo,
};

export default connect(() => ({}), mapDispatchToProps)(EventDetailCard);
