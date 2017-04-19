import React from 'react';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/calendar';
import Event from './Event';

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

  console.log(props);
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  const events = [];
  for (let i = 0; i < props.eventList.length; i++) {
    events.push(Event(props.eventList[i]));
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

const mapStateToProps = state => state.calendar;
const mapDispatchToProps = dispatch => ({
  retrieveCalendar: () => dispatch(actions.retrieveCalendar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
