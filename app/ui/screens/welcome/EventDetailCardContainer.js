import { connect } from 'react-redux';
import { retrievePizzaInfo } from '../../../actions/pizza';
import * as actions from '../../../actions/event';
import EventDetailCard from './EventDetailCard';

const mapDispatchToProps = dispatch => ({
  loadEvent: pk => dispatch(actions.event(pk)),
  retrievePizzaInfo: () => dispatch(retrievePizzaInfo()),
});

export default connect(() => ({}), mapDispatchToProps)(EventDetailCard);
