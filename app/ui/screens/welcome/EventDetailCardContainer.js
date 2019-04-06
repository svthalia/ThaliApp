import { connect } from 'react-redux';
import { retrievePizzaInfo } from '../../../actions/pizza';
import * as actions from '../../../actions/event';
import EventDetailCard from './EventDetailCard';

const mapDispatchToProps = {
  loadEvent: pk => actions.event(pk),
  retrievePizzaInfo: () => retrievePizzaInfo(),
};

export default connect(() => ({}), mapDispatchToProps)(EventDetailCard);
