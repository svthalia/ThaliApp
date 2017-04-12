import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { openEvent } from '../actions/event';

const Event = (event) =>
  <View>
    <Text> <b>{event.title}</b> </Text>
    <Text> {new Date(event.start).toISOString().substring(0, 10)}</Text>
    <i>{event.description}</i>
    <Text>-----------------------------------------</Text>
    onPress={() => openEvent(event.id)}
  </View>
;

Event.propTypes = {
  openEvent: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  openEvent: () => dispatch(openEvent()),
});

export default connect(() => ({}), mapDispatchToProps)(Event);
export default Event;