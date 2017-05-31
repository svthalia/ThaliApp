import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';
import * as actions from '../actions/events';
import { pizzaUrl } from '../url';

import styles from './style/eventDetailCard';

const getInfo = (event) => {
  Moment.locale('nl');
  const start = Moment(event.start);
  const end = Moment(event.end);

  if (start.isSame(end, 'day')) {
    return (
      <Text style={styles.eventInfo}>
        {`${start.format('HH:mm')} - ${end.format('HH:mm')} | ${event.location}`}
      </Text>
    );
  }
  return (
    <View>
      <Text style={styles.eventInfo}>
        {`${start.format('D MMMM HH:mm')} - ${end.format('D MMMM HH:mm')}`}
      </Text>
      <Text style={styles.eventInfo}>{event.location}</Text>
    </View>
  );
};

const EventDetailCard = props => (
  <View style={styles.card}>
    <Text style={styles.eventTitle}>{props.event.title}</Text>
    {getInfo(props.event)}
    <Text
      numberOfLines={2}
      style={styles.description}
    >{props.event.description}</Text>
    <View style={styles.buttonList}>
      <TouchableOpacity
        onPress={() => props.loadEvent(props.event.pk, props.token)}
        style={styles.button}
      >
        <Text style={styles.moreInfo}>MEER INFO</Text>
      </TouchableOpacity>
      {props.event.pizza ? (
        <TouchableOpacity
          onPress={() => Linking.openURL(pizzaUrl)}
          style={styles.button}
        >
          <Text style={styles.orderPizza}>PIZZA</Text>
        </TouchableOpacity>
        ) : null}
    </View>
    {props.event.registered === null ? null : (
      <View
        style={[
          styles.indicator,
          props.event.registered ? styles.registered : styles.unregistered]}
      />
      )
    }
  </View>
);

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
    pizza: React.PropTypes.bool,
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
