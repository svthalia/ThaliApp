import React, { Component } from 'react';
import {
  RefreshControl, ScrollView, View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import styles from './style/EventAdminScreen';
import Colors from '../../style/Colors';

import AdminScreen from '../admin/AdminScreenConnector';
import StandardHeader from '../../components/standardHeader/StandardHeader';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';

const PAYMENT_TYPES = {
  NONE: 'no_payment',
  CARD: 'card_payment',
  CASH: 'cash_payment',
};

class EventAdminScreen extends Component {
  handleRefresh = () => {
    const { refresh, event } = this.props;
    refresh(event);
  };

  render() {
    const {
      status, loading, registrations, t,
    } = this.props;

    const items = registrations.map(item => ({
      pk: item.pk,
      name: item.name,
      checkbox: item.present,
      select: {
        options: [
          {
            key: PAYMENT_TYPES.NONE,
            label: t('NOT PAID'),
          },
          {
            key: PAYMENT_TYPES.CARD,
            label: t('CARD'),
          },
          {
            key: PAYMENT_TYPES.CASH,
            label: t('CASH'),
          },
        ],
        value: item.payment,
      },
    }));

    const filterTypes = [
      {
        label: t('Disabled filter'),
        checkItem: () => true,
      },
      {
        label: t('Filtering on payment'),
        checkItem: item => item.select.value === PAYMENT_TYPES.NONE,
      },
      {
        label: t('Filtering on presence'),
        checkItem: item => !item.checkbox,
      },
    ];

    if (status === 'initial') {
      return (
        <View style={styles.rootWrapper}>
          <StandardHeader />
          <LoadingScreen />
        </View>
      );
    }
    if (status === 'success') {
      if (items.length === 0) {
        return (
          <View style={styles.rootWrapper}>
            <StandardHeader />
            <ScrollView
              backgroundColor={Colors.background}
              contentContainerStyle={styles.rootWrapper}
              refreshControl={(
                <RefreshControl
                  refreshing={loading}
                  onRefresh={this.handleRefresh}
                />
              )}
            >
              <ErrorScreen message={t('No registrations found...')} />
            </ScrollView>
          </View>
        );
      }

      return (
        <View style={styles.rootWrapper}>
          <AdminScreen
            items={items}
            checkboxLabel={t('Present')}
            filterTypes={filterTypes}
            handleRefresh={() => this.props.refresh(this.props.event)}
            title={t('Registrations')}
            updateItem={this.props.updateRegistration}
            loading={loading}
          />
        </View>
      );
    }

    return (
      <View style={styles.rootWrapper}>
        <StandardHeader />
        <ScrollView
          backgroundColor={Colors.background}
          contentContainerStyle={styles.rootWrapper}
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.handleRefresh}
            />
          )}
        >
          <ErrorScreen message={t('Could not load the event...')} />
        </ScrollView>
      </View>
    );
  }
}

EventAdminScreen.propTypes = {
  registrations: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    present: PropTypes.bool.isRequired,
    payment: PropTypes.string.isRequired,
  })).isRequired,
  event: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  updateRegistration: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('ui/screens/events/EventAdminScreen')(EventAdminScreen);
