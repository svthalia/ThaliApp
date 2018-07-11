import React from 'react';
import { View, TouchableHighlight, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import PropTypes from 'prop-types';

import Colors from '../../style/Colors';
import styles from './style/Settings';

import { pushNotificationsSettingsActions } from '../../../actions/settings';

const Settings = props => (
  <View style={styles.container}>
    <TouchableHighlight
      onPress={props.pushNotifications}
      underlayColor={Colors.pressedWhite}
    >
      <Text style={styles.menuItem}>{props.t('Notifications')}</Text>
    </TouchableHighlight>
  </View>
);

Settings.propTypes = {
  t: PropTypes.func.isRequired,
  pushNotifications: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  pushNotifications: () => dispatch(pushNotificationsSettingsActions.retrieve()),
});

export default connect(() => ({}), mapDispatchToProps)(translate('screens/settings/Settings')(Settings));
