import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, SectionList } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';

import * as calendarActions from '../actions/calendar';
import EventCard from './EventCard';

import styles from './style/calendar';

/* eslint no-param-reassign: ["error", { "props": false }] */
const addEventToSection = (sections, date, event) => {
  const day = date.date();
  const month = date.month();

  if (!(month in sections)) {
    sections[month] = {
      key: date.format('MMMM'),
      data: {},
    };
  }

  if (!(day in sections[month].data)) {
    sections[month].data[day] = {
      dayNumber: day,
      dayOfWeek: date.format('dd'),
      events: [],
    };
  }

  sections[month].data[day].events.push(event);
};

/**
 * Takes a list of events and groups them by month and day.
 * Any event that spans multiple days will be split into separate events.
 * The list of sections is sorted at the end.
 */
const eventListToSections = (eventList) => {
  const sections = {};
  for (let i = 0; i < eventList.length; i += 1) {
    const start = Moment(eventList[i].start);
    const end = Moment(eventList[i].end);

    const daySpan = end.diff([
      start.year(), start.month(), start.date(),
    ], 'days') + 1;

    if (daySpan === 1) {
      addEventToSection(sections, start, eventList[i]);
    } else {
      // Add start day
      addEventToSection(sections, start, {
        ...eventList[i],
        title: `${eventList[i].title} (dag 1/${daySpan})`,
        end: null,
      });

      // Add all intermediate days
      for (let j = 2; j < daySpan; j += 1) {
        addEventToSection(sections, start.add(1, 'days'), {
          ...eventList[i],
          start: null,
          end: null,
          title: `${eventList[i].title} (dag ${j}/${daySpan})`,
        });
      }
      // Add end day
      addEventToSection(sections, end, {
        ...eventList[i],
        title: `${eventList[i].title} (dag ${daySpan}/${daySpan})`,
        start: null,
      });
    }
  }

  return Object.keys(sections).sort((a, b) => a - b).map((month) => {
    sections[month].data = Object.keys(sections[month].data).sort((a, b) => a - b).map((day) => {
      sections[month].data[day].events.sort((a, b) => {
        if (a.start == null && b.start == null) {
          return 0;
        } else if (a.start == null) {
          return -1;
        } else if (b.start == null) {
          return 1;
        }
        return Moment(a.start).diff(Moment(b.start));
      },
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
          event => <EventCard event={event} key={`${event.pk}:${event.title}`} />,
        )}
      </View>
    </View>
  );
};

class Calendar extends Component {
  componentDidMount() {
    Moment.locale('nl');
  }

  handleRefresh = () => {
    this.props.refresh();
  };

  render() {
    if (this.props.eventList.length === 0 && !this.props.loading) {
      return (
        <View>
          <Text>
            No events found!
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
          sections={eventListToSections(this.props.eventList)}
          keyExtractor={item => item.dayNumber}
          stickySectionHeadersEnabled
          onRefresh={this.handleRefresh}
          refreshing={this.props.loading}
        />
      </View>
    );
  }
}

Calendar.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    registered: PropTypes.bool,
    pizza: PropTypes.bool,
  })).isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventList: state.calendar.eventList,
  loading: state.calendar.loading,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(calendarActions.refresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
