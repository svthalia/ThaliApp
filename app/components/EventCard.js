import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/events';

import styles from './style/eventCard';

/**
 * Extracts time in hh:mm format from a Date object
 */
const dateToTime = date => (
  `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}`
);

const EventCard = (props) => {
  const startTime = dateToTime(new Date(props.event.start));
  const endTime = dateToTime(new Date(props.event.end));

  return (
    <TouchableHighlight
      onPress={() => props.loadEvent(props.event.pk, props.token)}
      style={styles.button}
    >
      <View style={[styles.card, props.event.registered ? styles.registered : styles.unregistered]}>
        <Text style={styles.eventTitle}>{props.event.title}</Text>
        <Text style={styles.eventInfo}>{`${startTime} - ${endTime} | ${props.event.location}`}</Text>
      </View>
    </TouchableHighlight>
  );
};

EventCard.propTypes = {
  event: React.PropTypes.shape({
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    location: React.PropTypes.string,
    price: React.PropTypes.string,
    pk: React.PropTypes.number,
    registered: React.PropTypes.bool,
  }).isRequired,
  loadEvent: React.PropTypes.func.isRequired,
  token: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  loadEvent: (pk, token) => dispatch(actions.loadEvent(pk, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
