import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import styles from './style/NotificationsSection';
import Colors from '../../style/Colors';
import CardSection from '../../components/cardSection/CardSection';

const GENERAL_KEY = 'general';

class NotificationsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromProps = (props, state) => {
    if (props.status !== 'success' || Object.keys(state).length > 0) {
      return null;
    }

    const newState = {};
    for (let i = 0; i < props.categoryList.length; i += 1) {
      if (props.categoryList[i].key === GENERAL_KEY) {
        newState[props.categoryList[i].key] = true;
      } else {
        newState[props.categoryList[i].key] = props.categoryList[i].enabled;
      }
    }
    return newState;
  };

  updateField = (key, value) => {
    const update = {};
    update[key] = value;
    this.setState(update, () => {
      const categories = Object.keys(this.state).filter(k => this.state[k]);
      this.props.saveCategories(categories);
    });
  };

  render() {
    const { status, categoryList, t } = this.props;
    let content = (
      <Text style={styles.emptyText}>
        {t('Notifications settings could not be loaded.')}
      </Text>
    );

    if (status === 'success') {
      content = categoryList.map((category, i) => (
        <View
          style={[styles.categoryContainer, i !== 0 && styles.borderTop]}
          key={category.key}
        >
          <View
            style={styles.textContainer}
          >
            <Text
              style={styles.label}
            >
              {category.name}
              {' '}
              {category.key === GENERAL_KEY && this.props.t('(required)')}
            </Text>
            <Text
              style={styles.description}
            >
              {category.description}
            </Text>
          </View>
          <Switch
            value={this.state[category.key]}
            onValueChange={value => this.updateField(category.key, value)}
            trackColor={{
              false: Colors.lightGray,
              true: Colors.magenta,
            }}
            thumbColor={this.state[category.key]
              ? Colors.darkMagenta : Colors.grey}
            disabled={category.key === GENERAL_KEY}
            style={styles.settingsSwitch}
          />
        </View>
      ));
    }

    return (
      <CardSection sectionHeader={t('Notifications')}>
        {content}
      </CardSection>
    );
  }
}

NotificationsSection.propTypes = {
  categoryList: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  saveCategories: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('screens/settings/NotificationsSection')(NotificationsSection);
