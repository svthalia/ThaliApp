import { connect } from 'react-redux';
import * as calendarActions from '../../../actions/calendar';
import CalendarScreen from './CalendarScreen';

const mapStateToProps = state => ({
  eventList: state.calendar.eventList,
  loading: state.calendar.loading,
  status: state.calendar.status,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(calendarActions.refresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
