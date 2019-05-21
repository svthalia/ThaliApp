import { connect } from 'react-redux';
import * as eventActions from '../../../actions/event';
import CalendarItem from './CalendarItem';
import * as navigationActions from '../../../actions/navigation';

const mapDispatchToProps = {
  loadEvent: (event) => {
    if (event.partner) {
      return navigationActions.openWebsite(event.url);
    }
    return eventActions.event(event.pk);
  },
};

export default connect(() => ({}), mapDispatchToProps)(CalendarItem);
