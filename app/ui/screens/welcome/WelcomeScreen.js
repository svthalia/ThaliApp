import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import EventDetailCard from './EventDetailCardConnector';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import styles from './style/Welcome';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';
import * as calendarActions from '../../../actions/calendar';

const eventListToSections = (eventList) => {
  const calendarFormat = {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd D MMMM',
    lastDay: '[Yesterday]',
    lastWeek: 'dddd D MMMM',
    sameElse: 'dddd D MMMM',
  };

  const numberOfDays = 2;
  const eventLists = [];

  let eventIndex = 0;

  for (let i = 0; i < numberOfDays && eventIndex < eventList.length; i += 1) {
    const first = eventList[eventIndex];
    const list = [];
    while (
      eventIndex < eventList.length &&
      Moment(first.start).isSame(eventList[eventIndex].start, 'day')
    ) {
      list.push(eventList[eventIndex]);
      eventIndex += 1;
    }
    eventLists.push(list);
  }

  return eventLists.map((list) => ({
    key: Moment(list[0].start).calendar(null, calendarFormat),
    data: list,
  }));
};

const Footer = (props) => (
  <TouchableOpacity onPress={props.openCalendar} style={styles.footer}>
    <Text style={styles.footerText}>SHOW THE ENTIRE AGENDA</Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  openCalendar: PropTypes.func.isRequired,
};

const mapDispatchToFooterProps = {
  openCalendar: calendarActions.open,
};

const FooterComponent = connect(() => ({}), mapDispatchToFooterProps)(Footer);

class WelcomeScreen extends Component {
  handleRefresh = () => {
    const { refresh } = this.props;
    refresh();
  };

  render() {
    const { status, loading, eventList } = this.props;

    let content = null;

    if (status === 'initial') {
      content = <LoadingScreen />;
    } else if (status === 'failure') {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl onRefresh={this.handleRefresh} refreshing={loading} />
          }
        >
          <ErrorScreen message="Sorry! We couldn't load any data." />
        </ScrollView>
      );
    } else if (eventList.length === 0) {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={
            <RefreshControl onRefresh={this.handleRefresh} refreshing={loading} />
          }
        >
          <ErrorScreen message='No events found!' />
        </ScrollView>
      );
    } else {
      content = (
        <View style={styles.content}>
          <SectionList
            style={styles.sectionList}
            renderItem={(item) => <EventDetailCard event={item.item} />}
            renderSectionHeader={(itemHeader) => (
              <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
            )}
            sections={eventListToSections(eventList)}
            keyExtractor={(event) => event.pk}
            stickySectionHeadersEnabled
            onRefresh={this.handleRefresh}
            refreshing={loading}
            ListFooterComponent={FooterComponent}
          />
        </View>
      );
    }

    return content;
  }
}

WelcomeScreen.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      start: PropTypes.string,
      end: PropTypes.string,
      location: PropTypes.string,
      price: PropTypes.string,
      pk: PropTypes.number,
      registered: PropTypes.bool,
      pizza: PropTypes.bool,
    })
  ).isRequired,
  refresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};

export default withStandardHeader(WelcomeScreen, true);
