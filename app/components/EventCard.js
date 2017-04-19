import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const EventCard = props =>
  <View>
    <Text> <b>{props.event.title}</b> </Text>
    <Text> {new Date(props.event.start).toISOString().substring(0, 10)}</Text>
    <i>{props.event.description}</i>
    <Text>-----------------------------------------</Text>
  </View>
;

EventCard.propTypes = {
  event: React.PropTypes.objectOf(EventCard).isRequired,
};

export default connect(() => ({}), () => ({}))(EventCard);
