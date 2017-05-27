import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/events';

import styles from './style/eventDetailCard';

/**
 * Extracts time in hh:mm format from a Date object
 * TODO replace with Moment
 */
const dateToTime = date => (
  `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}`
);

const EventDetailCard = (props) => {
  const startTime = dateToTime(new Date(props.event.start));
  const endTime = dateToTime(new Date(props.event.end));

  return (
    <View style={styles.card}>
      <Text style={styles.eventTitle}>{props.event.title}</Text>
      <Text style={styles.eventInfo}>{`${startTime} - ${endTime} | ${props.event.location}`}</Text>
      <Text
        numberOfLines={2}
        style={styles.description}
      >{props.event.description}</Text>
      <View style={styles.buttonList}>
        <TouchableOpacity
          onPress={() => props.loadEvent(props.event.pk, props.token)}
          style={styles.button}
        >
          <Text
            style={styles.moreInfo}
          >MEER INFO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

EventDetailCard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EventDetailCard);
