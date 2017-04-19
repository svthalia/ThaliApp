import React from 'react';
import { View, Text } from 'react-native';

const Event = event =>
  <View>
    <Text> <b>{event.title}</b> </Text>
    <Text> {new Date(event.start).toISOString().substring(0, 10)}</Text>
    <i>{event.description}</i>
    <Text>-----------------------------------------</Text>
  </View>
;

export default Event;
