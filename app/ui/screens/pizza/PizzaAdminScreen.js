import React, { Component } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style/PizzaAdminScreen';
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

class PizzaAdminScreen extends Component {
  handleRefresh = () => {
    this.props.retrieveOrders();
  };

  render() {
    const { status, loading, orders } = this.props;

    const items = orders.map((item) => ({
      pk: item.pk,
      name: item.display_name,
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
            filterTypes={filterTypes}
            handleRefresh={this.handleRefresh}
            title='Orders'
            updateItem={(pk, checkbox, select) => this.props.updateOrder(pk, select)}
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

PizzaAdminScreen.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      pk: PropTypes.number.isRequired,
      display_name: PropTypes.string.isRequired,
      payment: PropTypes.string.isRequired,
    })
  ).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  retrieveOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
};

export default PizzaAdminScreen;
