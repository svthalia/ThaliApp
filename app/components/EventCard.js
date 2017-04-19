import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/events';

const EventCard = props =>
  <View>
    <Text> <b>{props.event.title}</b> </Text>
    <Text> {new Date(props.event.start).toISOString().substring(0, 10)}</Text>
    <i>{props.event.description}</i>
    <Text>-----------------------------------------</Text>
    <Button title="Openen" onPress={() => props.loadEvent(props.event.id)} />
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
  loadEvent: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadEvent: id => dispatch(actions.loadEvent(id)),
});

export default connect(() => ({}), mapDispatchToProps)(EventCard);
