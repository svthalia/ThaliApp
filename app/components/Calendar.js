import React from 'react';
import { Text, View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/calendar';
import EventCard from './EventCard';

import styles from './style/calendar';

const weekDays = ['Zo', 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za'];
const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni',
  'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December'];

/**
 * Takes a list of events and groups them by month and day.
 */
const eventListToSections = (eventList) => {
  const sections = {};
  for (let i = 0; i < eventList.length; i += 1) {
    const start = new Date(eventList[i].start);
    const month = start.getMonth();
    const day = start.getDate();

    if (!(month in sections)) {
      sections[month] = {
        key: months[month],
        data: {},
      };
    }

    if (!(day in sections[month].data)) {
      sections[month].data[day] = {
        dayNumber: day,
        dayOfWeek: weekDays[start.getUTCDay()],
        events: [],
      };
    }

    sections[month].data[day].events.push(eventList[i]);
  }

  return Object.keys(sections).sort((a, b) => a - b).map((month) => {
    sections[month].data = Object.keys(sections[month].data).sort((a, b) => a - b).map((day) => {
      sections[month].data[day].events.sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
      );
      return sections[month].data[day];
    });
    return sections[month];
  });
};

const renderItem = (item) => {
  const { dayNumber, dayOfWeek, events } = item.item;

  return (
    <View style={styles.day} >
      <View style={styles.dateInfo} >
        <Text style={styles.dayNumber} >{dayNumber}</Text>
        <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
      </View>
      <View style={styles.eventList} >
        {events.map(
          event => <EventCard event={event} key={event.pk} />,
        )}
      </View>
    </View>
  );
};

const Calendar = (props) => {
  if (!props.calendarFetched) {
    props.retrieveCalendar(props.token);
    return (
      <View>
        <Text>
          No calendar retrieved!
        </Text>
      </View>
    );
  }
  return (
    <View>
      <SectionList
        style={styles.sectionList}
        renderItem={renderItem}
        renderSectionHeader={
          itemHeader => <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
        }
        sections={eventListToSections(props.eventList)}
        keyExtractor={item => item.dayNumber}
        stickySectionHeadersEnabled
      />
    </View>
  );
};

Calendar.propTypes = {
  eventList: React.PropTypes.arrayOf(React.PropTypes.shape({
    pk: React.PropTypes.number,
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    location: React.PropTypes.string,
    price: React.PropTypes.string,
    registered: React.PropTypes.bool,
  })).isRequired,
  calendarFetched: React.PropTypes.bool.isRequired,
  retrieveCalendar: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  ...state.calendar,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  retrieveCalendar: token => dispatch(actions.retrieveCalendar(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
