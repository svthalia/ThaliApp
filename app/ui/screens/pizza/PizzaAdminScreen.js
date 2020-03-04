import React, { Component } from 'react';
import {
  RefreshControl, ScrollView, View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
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
    const {
      status, loading, orders, t,
    } = this.props;

    const items = orders.map(item => ({
      pk: item.pk,
      name: item.display_name,
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
            filterTypes={filterTypes}
            handleRefresh={this.handleRefresh}
            title={t('Orders')}
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

PizzaAdminScreen.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    display_name: PropTypes.string.isRequired,
    payment: PropTypes.string.isRequired,
  })).isRequired,
  status: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  retrieveOrders: PropTypes.func.isRequired,
  updateOrder: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation('ui/screens/pizza/PizzaAdminScreen')(PizzaAdminScreen);
