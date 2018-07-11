import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';


import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

import styles from './style/PushNotifications';
import Colors from '../../style/Colors';

import { pushNotificationsSettingsActions } from '../../../actions/settings';
import * as pushNotificationsActions from '../../../actions/pushNotifications';

class PushNotifications extends Component {
  static getDerivedStateFromProps = (props) => {
    if (props.status !== 'success') {
      return null;
    }

    const newState = {};
    for (let i = 0; i < props.categoryList.length; i += 1) {
      newState[props.categoryList[i].key] = props.categoryList[i].enabled;
    }
    return newState;
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateField = (key, value) => {
    const update = {};
    update[key] = value;
    this.setState(update, () => {
      const categories = Object.keys(this.state).filter(k => this.state[k]);
      this.props.register(categories);
      this.props.saveCategories(categories);
    });
  };

  render() {
    if (this.props.status === 'loading') {
      return <LoadingScreen />;
    } else if (this.props.status === 'failure') {
      return <ErrorScreen message={this.props.t('Sorry, we couldn\'t load any data.')} />;
    }

    return (
      <View style={styles.container}>
        {this.props.categoryList.map(category => (
          <View style={styles.setting} key={category.key}>
            <Text
              style={styles.label}
              key={category.key}
            >{category.name} {category.key === 'general' && this.props.t('(required)')}</Text>
            <Switch
              value={this.state[category.key]}
              onValueChange={value => this.updateField(category.key, value)}
              thumbTintColor={this.state[category.key] ? Colors.darkMagenta : Colors.lightGray}
              onTintColor={Colors.magenta}
              disabled={category.key === 'general'}
            />
          </View>
        ))}
      </View>
    );
  }
}

PushNotifications.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  saveCategories: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  categoryList: state.settings.pushNotifications.categoryList,
  status: state.settings.pushNotifications.status,
});

const mapDispatchToProps = dispatch => ({
  register: categoryList => dispatch(pushNotificationsActions.register(categoryList)),
  saveCategories: catList => dispatch(pushNotificationsSettingsActions.saveCategories(catList)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('screens/settings/PushNotifications')(PushNotifications));
