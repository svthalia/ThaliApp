import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, Linking } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Moment from 'moment';

import * as eventActions from '../actions/event';

import styles from './style/eventCard';

const getEventInfo = (event, t) => {
  if (event.start === null && event.end === null) {
    return event.location;
  } else if (event.start === null) {
    return `${t('Until')} ${Moment(event.end).format('HH:mm')} | ${event.location}`;
  } else if (event.end === null) {
    return `${t('From')} ${Moment(event.start).format('HH:mm')} | ${event.location}`;
  }
  return `${Moment(event.start).format('HH:mm')} - ${Moment(event.end).format('HH:mm')} | ${event.location}`;
};

const EventCard = props => (
  <TouchableHighlight
    onPress={() => props.loadEvent(props.event)}
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
        {getEventInfo(props.event, props.t)}
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
  t: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadEvent: (event) => {
    if (event.partner) {
      Linking.openURL(event.url);
    } else {
      dispatch(eventActions.event(event.pk));
    }
  },
});

export default connect(() => ({}), mapDispatchToProps)(translate('eventCard')(EventCard));
