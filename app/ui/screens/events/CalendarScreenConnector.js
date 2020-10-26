import { connect } from 'react-redux';
import * as calendarActions from '../../../actions/calendar';
import CalendarScreen from './CalendarScreen';

const mapStateToProps = (state) => ({
  eventList: state.calendar.eventList,
  loading: state.calendar.loading,
  status: state.calendar.status,
  keywords: state.calendar.keywords,
});

const mapDispatchToProps = {
  events: calendarActions.events,
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
