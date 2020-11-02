import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableHighlight, View } from 'react-native';
import Moment from 'moment';

import styles from './style/CalendarItem';

const getEventInfo = (event) => {
  if (event.start === null && event.end === null) {
    return event.location;
  }
  if (event.start === null) {
    return `Until ${Moment(event.end).format('HH:mm')} | ${event.location}`;
  }
  if (event.end === null) {
    return `From ${Moment(event.start).format('HH:mm')} | ${event.location}`;
  }
  return `${Moment(event.start).format('HH:mm')} - ${Moment(event.end).format(
    'HH:mm'
  )} | ${event.location}`;
};

const CalendarItem = (props) => (
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
      <Text
        style={[
          styles.eventTitle,
          props.event.partner ? styles.partnerEventTitle : null,
        ]}
      >
        {props.event.title}
      </Text>
      <Text
        style={[styles.eventInfo, props.event.partner ? styles.partnerEventInfo : null]}
      >
        {getEventInfo(props.event)}
      </Text>
    </View>
  </TouchableHighlight>
);

CalendarItem.propTypes = {
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
};

export default CalendarItem;
