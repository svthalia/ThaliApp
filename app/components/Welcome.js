import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, SectionList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';

import EventDetailCard from './EventDetailCard';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

import * as welcomeActions from '../actions/welcome';
import { navigate } from '../actions/navigation';
import styles from './style/welcome';

const eventListToSections = (eventList) => {
  Moment.locale('nl');
  const calendarFormat = {
    sameDay: '[Vandaag]',
    nextDay: '[Morgen]',
    nextWeek: 'dddd D MMMM',
    lastDay: '[Gisteren]',
    lastWeek: 'dddd D MMMM',
    sameElse: 'dddd D MMMM',
  };

  const numberOfDays = 2;
  const eventLists = [];

  let eventIndex = 0;

  for (let i = 0; i < numberOfDays && eventIndex < eventList.length; i += 1) {
    const first = eventList[eventIndex];
    const list = [];
    while (eventIndex < eventList.length && Moment(first.start).isSame(eventList[eventIndex].start, 'day')) {
      list.push(eventList[eventIndex]);
      eventIndex += 1;
    }
    eventLists.push(list);
  }

  return eventLists.map(list => ({
    key: Moment(list[0].start).calendar(null, calendarFormat),
    data: list,
  }));
};

const Footer = props => (
  <TouchableOpacity
    onPress={() => props.navigate('eventList', true)}
    style={styles.footer}
  >
    <Text style={styles.footerText}>BEKIJK DE GEHELE AGENDA</Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
};

const mapDispatchToPropsFooter = dispatch => ({
  navigate: (scene, newSection) => dispatch(navigate(scene, newSection)),
});

const FooterComponent = connect(() => ({}), mapDispatchToPropsFooter)(Footer);

class Welcome extends Component {
  handleRefresh = () => {
    this.props.refresh();
  };

  render() {
    if (!this.props.hasLoaded) {
      return <LoadingScreen />;
    } else if (!this.props.success) {
      return (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={(
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={this.props.loading}
            />
          )}
        >
          <ErrorScreen message="Sorry! We couldn't load any data." />
        </ScrollView>
      );
    } else if (this.props.eventList.length === 0) {
      return (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={(
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={this.props.loading}
            />
          )}
        >
          <ErrorScreen message="No events found!" />
        </ScrollView>
      );
    }
    return (
      <View style={styles.content}>
        <SectionList
          style={styles.sectionList}
          renderItem={item => <EventDetailCard event={item.item} />}
          renderSectionHeader={
            itemHeader => <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
          }
          sections={eventListToSections(this.props.eventList)}
          keyExtractor={event => event.pk}
          stickySectionHeadersEnabled
          onRefresh={this.handleRefresh}
          refreshing={this.props.loading}
          ListFooterComponent={FooterComponent}
        />
      </View>
    );
  }
}

Welcome.propTypes = {
  eventList: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    pk: PropTypes.number,
    registered: PropTypes.bool,
    pizza: PropTypes.bool,
  })).isRequired,
  refresh: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  eventList: state.welcome.eventList,
  loading: state.welcome.loading,
  success: state.welcome.success,
  hasLoaded: state.welcome.hasLoaded,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(welcomeActions.refresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
