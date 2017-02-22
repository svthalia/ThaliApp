import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from '../style';

import * as actions from '../actions/navigation';

const Sidebar = props =>
  <View
    style={styles.sidebar}
  >
    <Text style={styles.header}>MENU</Text>
    <Text onPress={() => props.navigate('welcome')} style={styles.button} >Welcome</Text>
    <Text onPress={() => props.navigate('events')} style={styles.button} >Events</Text>
    <Text onPress={() => props.navigate('authenticate')} style={styles.button} >Authenticate</Text>
  </View>
;

Sidebar.propTypes = {
  navigate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
});

export default connect(() => ({}), mapDispatchToProps)(Sidebar);
