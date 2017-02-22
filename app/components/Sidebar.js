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
    <Text onPress={() => props.navigate('login')} style={styles.button} >Log in</Text>
    <Text onPress={() => props.navigate('welcome')} style={styles.button} >Welcome</Text>
  </View>
;

Sidebar.propTypes = {
  navigate: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  navigate: scene => dispatch(actions.navigate(scene)),
});

export default connect(() => ({}), mapDispatchToProps)(Sidebar);
