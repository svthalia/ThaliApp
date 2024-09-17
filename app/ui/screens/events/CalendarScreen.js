import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Moment from 'moment';
import CalendarItem from './CalendarItemConnector';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

import styles from './style/CalendarScreen';
import SearchHeader from '../../components/searchHeader/SearchHeaderConnector';
import DismissKeyboardView from '../../components/dismissKeyboardView/DismissKeyboardView';
import FloatingActionButton from '../../components/floatingActionButton/FloatingActionButton';

const filters = {
  all: () => true,
  registered: (item) => item.registered,
  open: (item) => item.registration_allowed,
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const addEventToSection = (sections, date, event) => {
  const day = date.date();
  const month = date.month();
  const year = date.year();
  const sectionKey = year * 100 + month;

  if (!(sectionKey in sections)) {
    sections[sectionKey] = {
      key: date.format('MMMM YYYY'),
      data: {},
    };
  }

  if (!(day in sections[sectionKey].data)) {
    sections[sectionKey].data[day] = {
      dayNumber: day,
      dayOfWeek: date.format('ddd'),
      events: [],
    };
  }

  sections[sectionKey].data[day].events.push(event);
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

    const daySpan = end.diff([start.year(), start.month(), start.date()], 'days') + 1;

    if (daySpan === 1) {
      addEventToSection(sections, start, eventList[i]);
    } else {
      // Add start day
      addEventToSection(sections, start, {
        ...eventList[i],
        title: `${eventList[i].title} (day 1/${daySpan})`,
        end: null,
      });

      // Add all intermediate days
      for (let j = 2; j < daySpan; j += 1) {
        addEventToSection(sections, start.add(1, 'days'), {
          ...eventList[i],
          start: null,
          end: null,
          title: `${eventList[i].title} (day ${j}/${daySpan})`,
        });
      }
      // Add end day
      addEventToSection(sections, end, {
        ...eventList[i],
        title: `${eventList[i].title} (day ${daySpan}/${daySpan})`,
        start: null,
      });
    }
  }

  return Object.keys(sections)
    .sort((a, b) => a - b)
    .map((month) => {
      sections[month].data = Object.keys(sections[month].data)
        .sort((a, b) => a - b)
        .map((day) => {
          sections[month].data[day].events.sort((a, b) => {
            if (a.start == null && b.start == null) {
              return 0;
            }
            if (a.start == null) {
              return -1;
            }
            if (b.start == null) {
              return 1;
            }
            return Moment(a.start).diff(Moment(b.start));
          });
          return sections[month].data[day];
        });
      return sections[month];
    });
};

const renderItem = (item) => {
  const { dayNumber, dayOfWeek, events } = item.item;

  return (
    <TouchableWithoutFeedback style={styles.day}>
      <View style={styles.day}>
        <View style={styles.dateInfo}>
          <Text style={styles.dayNumber}>{dayNumber}</Text>
          <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
        </View>
        <View style={styles.eventList}>
          {events.map((event) => (
            <CalendarItem event={event} key={`${event.pk}:${event.title}`} />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

class CalendarScreen extends Component {
  actions = [
    {
      text: 'All',
      iconName: 'reorder',
      onPress: () => this.updateFilter(filters.all),
    },
    {
      text: 'Your registrations',
      iconName: 'account-circle',
      onPress: () => this.updateFilter(filters.registered),
    },
    {
      text: 'Open registrations',
      iconName: 'event-available',
      onPress: () => this.updateFilter(filters.open),
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      activeFilter: filters.all,
    };
  }

  componentDidMount() {
    const { keywords } = this.props;
    this.props.events(keywords);
  }

  handleRefresh = () => {
    const { keywords } = this.props;
    this.props.events(keywords);
  };

  search = (searchKey) => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.props.events(searchKey);
    }, 500);
  };

  filteredEvents = () => {
    const { activeFilter } = this.state;
    const { eventList } = this.props;

    return eventList.filter(activeFilter);
  };

  updateFilter = (filter) => {
    this.setState({
      activeFilter: filter,
    });
  };

  render() {
    const items = this.filteredEvents();

    const header = (
      <SearchHeader
        title='Calendar'
        searchText='Find an event'
        search={this.search}
        searchKey={this.props.keywords}
      />
    );

    let content = (
      <SectionList
        style={styles.sectionList}
        renderItem={renderItem}
        renderSectionHeader={(itemHeader) => (
          <TouchableWithoutFeedback>
            <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
          </TouchableWithoutFeedback>
        )}
        sections={eventListToSections(items)}
        keyExtractor={(item) => item.dayNumber}
        stickySectionHeadersEnabled
        onRefresh={this.handleRefresh}
        refreshing={this.props.loading}
      />
    );

    if (this.props.status === 'initial') {
      content = <LoadingScreen />;
    } else if (this.props.status === 'failure') {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={this.props.loading}
            />
          }
        >
          <ErrorScreen message={"Sorry, we couldn't load any data."} />
        </ScrollView>
      );
    } else if (this.props.eventList.length === 0) {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={this.props.loading}
            />
          }
        >
          <ErrorScreen message='No events found!' />
        </ScrollView>
      );
    }

    return (
      <View style={styles.wrapper}>
        {header}
        <DismissKeyboardView contentStyle={styles.keyboardView}>
          {content}
        </DismissKeyboardView>
        <FloatingActionButton iconName='filter-list' actions={this.actions} />
      </View>
    );
  }
}

CalendarScreen.defaultProps = {
  keywords: '',
};

CalendarScreen.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      pk: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
      registration_allowed: PropTypes.bool.isRequired,
      price: PropTypes.string,
      registered: PropTypes.bool,
      pizza: PropTypes.bool,
      partner: PropTypes.bool,
      url: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  events: PropTypes.func.isRequired,
  keywords: PropTypes.string,
};

export default CalendarScreen;
