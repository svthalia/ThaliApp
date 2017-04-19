import React from 'react';
import { Text, View, ListView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/calendar';
import EventCard from './EventCard';

const Calendar = (props) => {
  if(!props.calendarFetched) {
    props.retrieveCalendar();
    return (
      <View>
        <Text>
          No calendar retrieved!
        </Text>
      </View>
    )
  }
  else {
    console.log('calendar is retrieved');
    console.log(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let events = [];
    for (let i = 0; i < props.eventList.length; i++) {
      console.log(props.eventList[i]);
      events.push(<EventCard event={props.eventList[i]}/>);
    }
    console.log(events);
    const dataSource = ds.cloneWithRows(events);
    return (
      <View>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) => rowData}
        />
      </View>
    );
  }
};

const mapStateToProps = state => state.calendar;
const mapDispatchToProps = dispatch => ({
  retrieveCalendar: () => dispatch(actions.retrieveCalendar()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
