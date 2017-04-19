import React from 'react';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/calendar';
import EventCard from './EventCard';

const Calendar = (props) => {
  if (!props.calendarFetched) {
    props.retrieveCalendar();
    return (
      <View>
        <Text>
          No calendar retrieved!
        </Text>
      </View>
    );
  }
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const events = [];
  for (let i = 0; i < props.eventList.length; i += 1) {
    events.push(<EventCard event={props.eventList[i]} />);
  }
  const dataSource = ds.cloneWithRows(events);
  return (
    <View>
      <ListView
        dataSource={dataSource}
        renderRow={rowData => rowData}
      />
    </View>
  );
};

Calendar.propTypes = {
  eventList: React.PropTypes.arrayOf(EventCard).isRequired,
  calendarFetched: React.PropTypes.bool.isRequired,
  retrieveCalendar: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => state.calendar;
const mapDispatchToProps = dispatch => ({
  retrieveCalendar: () => dispatch(actions.retrieveCalendar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
