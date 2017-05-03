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
    <Button title="Openen" onPress={() => props.loadEvent(props.event.id, props.token)} />
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
  token: React.PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  loadEvent: (id, token) => dispatch(actions.loadEvent(id, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
