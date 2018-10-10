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
import { translate } from 'react-i18next';
import Moment from 'moment';
import EventDetailCard from './EventDetailCardContainer';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import styles from './style/Welcome';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';
import * as calendarActions from '../../../actions/calendar';

const eventListToSections = (eventList, t) => {
  const calendarFormat = {
    sameDay: `[${t('Today')}]`,
    nextDay: `[${t('Tomorrow')}]`,
    nextWeek: 'dddd D MMMM',
    lastDay: `[${t('Yesterday')}]`,
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
    onPress={props.openCalendar}
    style={styles.footer}
  >
    <Text style={styles.footerText}>
      {props.t('SHOW THE ENTIRE AGENDA')}
    </Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  openCalendar: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapDispatchToFooterProps = dispatch => ({
  openCalendar: () => dispatch(calendarActions.open()),
});

const FooterComponent = connect(() => ({}), mapDispatchToFooterProps)(translate('screens/welcome/WelcomeScreen')(Footer));

class WelcomeScreen extends Component {
  handleRefresh = () => {
    const { refresh } = this.props;
    refresh();
  };

  render() {
    const {
      status, t, loading, eventList,
    } = this.props;

    let content = null;

    if (status === 'initial') {
      content = (<LoadingScreen />);
    } else if (status === 'failure') {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={(
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={loading}
            />
          )}
        >
          <ErrorScreen message={t('Sorry! We couldn\'t load any data.')} />
        </ScrollView>
      );
    } else if (eventList.length === 0) {
      content = (
        <ScrollView
          contentContainerStyle={styles.content}
          refreshControl={(
            <RefreshControl
              onRefresh={this.handleRefresh}
              refreshing={loading}
            />
          )}
        >
          <ErrorScreen message={t('No events found!')} />
        </ScrollView>
      );
    } else {
      content = (
        <View style={styles.content}>
          <SectionList
            style={styles.sectionList}
            renderItem={item => <EventDetailCard event={item.item} />}
            renderSectionHeader={
              itemHeader => (
                <Text style={styles.sectionHeader}>
                  {itemHeader.section.key}
                </Text>
              )
            }
            sections={eventListToSections(eventList, t)}
            keyExtractor={event => event.pk}
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
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('screens/welcome/WelcomeScreen')(withStandardHeader(WelcomeScreen, true));
