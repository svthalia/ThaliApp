import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

const Event = (props) => {
  if (props.success) {
    return (
      <View>
        <Text><h1>{props.data.title}</h1></Text>
        <Text>{props.data.description}</Text>
        <Text>Locatie: {props.data.location}</Text>
        <Text>Prijs: {props.data.price}</Text>
        <Text>Boete: {props.data.fine}</Text>
      </View>
    );
  }
  return (
    <Text>Kon het evenement niet laden...</Text>
  );
};

Event.propTypes = {
  data: React.PropTypes.shape({
    pk: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    start: React.PropTypes.string.isRequired,
    end: React.PropTypes.string.isRequired,
    organiser: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
    ]).isRequired,
    location: React.PropTypes.string.isRequired,
    price: React.PropTypes.string.isRequired,
    fine: React.PropTypes.string.isRequired,
  }).isRequired,
  success: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  data: state.events.data,
  success: state.events.success,
});

export default connect(mapStateToProps, () => ({}))(Event);
