import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/login';

const Welcome = props =>
  <View>
    <Text>Welcome!</Text>
    <Button title="Uitloggen" onPress={() => props.logout()} />
  </View>;

Welcome.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default connect(() => ({}), mapDispatchToProps)(Welcome);
