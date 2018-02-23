import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, SectionList, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Moment from 'moment';

import EventDetailCard from './EventDetailCard';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

import * as welcomeActions from '../../../actions/welcome';
import { navigate } from '../../../actions/navigation';
import styles from './style/Welcome';

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
    onPress={() => props.navigate('eventList', true)}
    style={styles.footer}
  >
    <Text style={styles.footerText}>{props.t('SHOW THE ENTIRE AGENDA')}</Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapDispatchToPropsFooter = dispatch => ({
  navigate: (scene, newSection) => dispatch(navigate(scene, newSection)),
});

const FooterComponent = connect(() => ({}), mapDispatchToPropsFooter)(translate('screens/welcome/Welcome')(Footer));

class Welcome extends Component {
  handleRefresh = () => {
    this.props.refresh();
  };

  render() {
    if (this.props.status === 'initial') {
      return <LoadingScreen />;
    } else if (this.props.status === 'failure') {
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
          <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />
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
          <ErrorScreen message={this.props.t('No events found!')} />
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
          sections={eventListToSections(this.props.eventList, this.props.t)}
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
  status: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventList: state.welcome.eventList,
  loading: state.welcome.loading,
  status: state.welcome.status,
});

const mapDispatchToProps = dispatch => ({
  refresh: () => dispatch(welcomeActions.refresh()),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('screens/welcome/Welcome')(Welcome));
