import { Linking } from 'react-native';
import { connect } from 'react-redux';
import * as eventActions from '../../../actions/event';
import CalendarItem from './CalendarItem';

const mapDispatchToProps = dispatch => ({
  loadEvent: (event) => {
    if (event.partner) {
      Linking.openURL(event.url);
    } else {
      dispatch(eventActions.event(event.pk));
    }
  },
});

export default connect(() => ({}), mapDispatchToProps)(CalendarItem);
