import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions/events';

import styles from './style/eventCard';

const EventCard = (props) => {
  const date = new Date(props.event.start).toISOString().substring(0, 10);
  return (
    <View>
      <Text style={styles.boldText}>{props.event.title}</Text>
      <Text>{date}</Text>
      <Text style={styles.italicText}>{props.event.description}</Text>
      <Text>-----------------------------------------</Text>
      <Button title="Openen" onPress={() => props.loadEvent(props.event.pk, props.token)} />
    </View>
  );
};

EventCard.propTypes = {
  event: React.PropTypes.shape({
    title: React.PropTypes.string,
    description: React.PropTypes.string,
    start: React.PropTypes.string,
    location: React.PropTypes.string,
    price: React.PropTypes.string,
    pk: React.PropTypes.number,
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
