import React, { Component } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
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
    const { status, loading, registrations } = this.props;

    const items = registrations.map((item) => ({
      pk: item.pk,
      name: item.name,
      checkbox: item.present,
      select: {
        options: [
          {
            key: PAYMENT_TYPES.NONE,
            label: 'NOT PAID',
          },
          {
            key: PAYMENT_TYPES.CARD,
            label: 'CARD',
          },
          {
            key: PAYMENT_TYPES.CASH,
            label: 'CASH',
          },
        ],
        value: item.payment,
      },
    }));

    const filterTypes = [
      {
        label: 'Disabled filter',
        checkItem: () => true,
      },
      {
        label: 'Filtering on payment',
        checkItem: (item) => item.select.value === PAYMENT_TYPES.NONE,
      },
      {
        label: 'Filtering on presence',
        checkItem: (item) => !item.checkbox,
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
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={this.handleRefresh} />
              }
            >
              <ErrorScreen message='No registrations found...' />
            </ScrollView>
          </View>
        );
      }

      return (
        <View style={styles.rootWrapper}>
          <AdminScreen
            items={items}
            checkboxLabel='Present'
            filterTypes={filterTypes}
            handleRefresh={() => this.props.refresh(this.props.event)}
            title='Registrations'
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
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={this.handleRefresh} />
          }
        >
          <ErrorScreen message='Could not load the event...' />
        </ScrollView>
      </View>
    );
  }
}

EventAdminScreen.propTypes = {
  registrations: PropTypes.arrayOf(
    PropTypes.shape({
      pk: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      present: PropTypes.bool.isRequired,
      payment: PropTypes.string.isRequired,
    })
  ).isRequired,
  event: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  refresh: PropTypes.func.isRequired,
  updateRegistration: PropTypes.func.isRequired,
};

export default EventAdminScreen;
