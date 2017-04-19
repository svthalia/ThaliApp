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
  event: React.PropTypes.shape({
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    start: React.PropTypes.string,
    location: React.PropTypes.string,
    price: React.PropTypes.string,
    id: React.PropTypes.number,
  }).isRequired,
};

export default connect(() => ({}), () => ({}))(EventCard);
