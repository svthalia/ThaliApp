import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, SectionList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';
import EventDetailCard from './EventDetailCard';
import LoadingScreen from './LoadingScreen';

import { retrieveShortlist } from '../actions/welcome';
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
    eventIndex += 1;
    const list = [];
    let next = first;
    while (Moment(first.start).isSame(next.start, 'day') && eventIndex < eventList.length) {
      list.push(next);
      next = eventList[eventIndex];
      eventIndex += 1;
    }
    eventLists.push(list);
    eventIndex -= 1;
  }

  return eventLists.map(list => ({
    key: Moment(list[0].start).calendar(null, calendarFormat),
    data: list,
  }));
};

const Footer = props => (
  <TouchableOpacity
    onPress={() => props.navigate('eventList')}
    style={styles.footer}
  >
    <Text style={styles.footerText}>BEKIJK DE GEHELE AGENDA</Text>
  </TouchableOpacity>
);

Footer.propTypes = {
  navigate: PropTypes.func.isRequired,
};

const mapDispatchToPropsFooter = dispatch => ({
  navigate: scene => dispatch(navigate(scene)),
});

const FooterComponent = connect(() => ({}), mapDispatchToPropsFooter)(Footer);

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.retrieveShortlist(this.props.token, 5)
      .then(() => this.setState({ refreshing: false }));
  };

  render() {
    if (!this.props.hasLoaded) {
      this.props.retrieveShortlist(this.props.token, 5);
      return <LoadingScreen />;
    } else if (this.props.eventList.length === 0) {
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
          renderItem={item => <EventDetailCard event={item.item} />}
          renderSectionHeader={
            itemHeader => <Text style={styles.sectionHeader}>{itemHeader.section.key}</Text>
          }
          sections={eventListToSections(this.props.eventList)}
          keyExtractor={event => event.pk}
          stickySectionHeadersEnabled
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
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
  token: PropTypes.string.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  retrieveShortlist: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  eventList: state.welcome.eventList,
  token: state.session.token,
  hasLoaded: state.welcome.hasLoaded,
});

const mapDispatchToProps = dispatch => ({
  retrieveShortlist: (token, amount) => dispatch(retrieveShortlist(token, amount)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
