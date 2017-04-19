import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/eventCard';

const EventCard = (props) =>
  <View>
    <Text> onPress={() => actions.openEvent(props.event.id)} <b>{props.event.title}</b> </Text>
    <Text> {new Date(props.event.start).toISOString().substring(0, 10)}</Text>
    <i>{props.event.description}</i>
    <Text>-----------------------------------------</Text>
  </View>
;

EventCard.propTypes = {
  openEvent: React.PropTypes.func.isRequired,
  event: React.PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openEvent: (event_id) => dispatch(actions.openEvent(event_id)),
});

export default connect(() => ({}), mapDispatchToProps)(EventCard);