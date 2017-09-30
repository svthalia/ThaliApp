import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, Linking } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';

import * as eventActions from '../actions/event';

import styles from './style/eventCard';

const getEventInfo = (event) => {
  Moment.locale('nl');
  if (event.start === null && event.end === null) {
    return event.location;
  } else if (event.start === null) {
    return `Tot ${Moment(event.end).format('HH:mm')} | ${event.location}`;
  } else if (event.end === null) {
    return `Vanaf ${Moment(event.start).format('HH:mm')} | ${event.location}`;
  }
  return `${Moment(event.start).format('HH:mm')} - ${Moment(event.end).format('HH:mm')} | ${event.location}`;
};

const EventCard = props => (
  <TouchableHighlight
    onPress={() => props.loadEvent(props.event, props.token)}
    style={styles.button}
  >
    <View
      style={[
        styles.card,
        props.event.registered ? styles.registered : null,
        props.event.partner ? styles.partner : null,
      ]}
    >
      <Text style={[styles.eventTitle, props.event.partner ? styles.partnerEventTitle : null]}>
        {props.event.title}
      </Text>
      <Text style={[styles.eventInfo, props.event.partner ? styles.partnerEventInfo : null]}>
        {getEventInfo(props.event)}
      </Text>
    </View>
  </TouchableHighlight>
);

EventCard.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    pk: PropTypes.number,
    registered: PropTypes.bool,
    pizza: PropTypes.bool,
    partner: PropTypes.bool,
    url: PropTypes.string,
  }).isRequired,
  loadEvent: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  loadEvent: (event, token) => {
    if (event.partner) {
      Linking.openURL(event.url);
    } else {
      dispatch(eventActions.event(event.pk, token));
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
