import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RefreshControl, ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import LoadingScreen from './LoadingScreen';
import ErrorScreen from './ErrorScreen';

import { cancelOrder, orderPizza, retrievePizzaInfo } from '../actions/pizza';
import styles from './style/pizza';
import { colors } from '../style';

class Pizza extends Component {
  getProductFromList = (pk, pizzaList) => {
    for (let i = 0; i < pizzaList.length; i += 1) {
      if (pizzaList[i].pk === pk) {
        return pizzaList[i];
      }
    }
    return null;
  };

  getEventInfo = (title, subtitle) => (
    <View style={styles.eventInfo}>
      <Text style={styles.title}>{this.props.t('Order pizza for {{title}}', { title })}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );

  getOverview = (order, pizzaList) => {
    if (order) {
      const productInfo = this.getProductFromList(order.product, pizzaList);
      return (
        <View
          style={[styles.overview, order.paid ? styles.greenBackground : styles.redBackground]}
        >
          <Text
            style={styles.overviewText}
            numberOfLines={3}
          >{productInfo.name}</Text>
        </View>
      );
    }
    return <Text style={styles.header}>{this.props.t('You did not place an order.')}</Text>;
  };

  getOrder = (order, pizzaList, hasEnded) => {
    if (order) {
      const productInfo = this.getProductFromList(order.product, pizzaList);

      return (
        <View style={styles.section}>
          <Text style={styles.header}>Current order</Text>
          <View style={styles.card}>
            <View
              style={[styles.orderStatus, order.paid ? styles.paidStatus : styles.notPaidStatus]}
            >
              <Text style={styles.orderStatusText}>
                {order.paid && this.props.t('The order has been paid for.')}
                {!order.paid && this.props.t('The order has not yet been paid for.')}
              </Text>
            </View>
            <View style={[styles.pizzaContainer, styles.orderedPizzaContainer]}>
              <View style={styles.pizzaInfo}>
                <Text style={styles.pizzaName}>{productInfo.name}</Text>
                <Text style={styles.pizzaDescription}>{productInfo.description}</Text>
                <Text style={styles.pizzaPrice}>€{productInfo.price}</Text>
              </View>
              {(!order.paid && !hasEnded) && (
                <TouchableHighlight
                  onPress={() => this.props.cancelOrder()}
                  style={styles.button}
                  underlayColor={colors.darkMagenta}
                >
                  <Icon
                    name="delete"
                    color={colors.white}
                    size={18}
                  />
                </TouchableHighlight>
              )}
            </View>
          </View>
        </View>
      );
    }
    return null;
  };

  getPizzaList = (pizzaList, hasOrder) => (
    <View style={styles.section}>
      {hasOrder && (
        <Text style={styles.header}>{this.props.t('Changing your order')}</Text>
      )}
      <View style={[styles.card, styles.pizzaList]}>
        {pizzaList.map(pizza => (
          <View
            key={pizza.pk}
            style={styles.pizzaContainer}
          >
            <View style={styles.pizzaInfo}>
              <Text style={styles.pizzaName}>{pizza.name}</Text>
              <Text style={styles.pizzaDescription}>{pizza.description}</Text>
              <Text style={styles.pizzaPrice}>€{pizza.price}</Text>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.props.orderPizza(pizza.pk, hasOrder);
                this.pizzaScroll.scrollTo({ x: 0, y: 0, animated: true });
              }}
              style={styles.button}
              underlayColor={colors.darkMagenta}
            >
              <Icon
                name="add-shopping-cart"
                color={colors.white}
                size={18}
              />
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </View>
  );

  handleRefresh = () => {
    this.props.retrievePizzaInfo();
  };

  render() {
    if (!this.props.hasLoaded) {
      return <LoadingScreen />;
    } else if (!this.props.success) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.handleRefresh}
            />
          }
          contentContainerStyle={styles.content}
        >
          <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />
        </ScrollView>
      );
    } else if (!this.props.event) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this.handleRefresh}
            />
          }
          contentContainerStyle={styles.content}
        >
          <Text
            style={styles.title}
          >{this.props.t('There is currently no event for which you can order food.')}</Text>
        </ScrollView>
      );
    }

    const start = Moment(this.props.event.start);
    const end = Moment(this.props.event.end);
    const now = Moment();

    const inFuture = start.diff(now, 'm') > 0;
    const hasEnded = end.diff(now, 'm') < 0;

    let subtitle;
    if (inFuture) {
      subtitle = this.props.t(`It will be possible to order from ${start.format('HH:mm')}`);
    } else if (hasEnded) {
      subtitle = this.props.t(`It was possible to order until ${end.format('HH:mm')}`);
    } else {
      subtitle = this.props.t(`You can order until ${end.format('HH:mm')}`);
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.props.loading}
            onRefresh={this.handleRefresh}
          />
        }
        ref={(ref) => { this.pizzaScroll = ref; }}
      >
        <View style={styles.content}>
          {this.getEventInfo(this.props.event.title, subtitle)}
          {hasEnded && this.getOverview(this.props.order, this.props.pizzaList)}
          {this.getOrder(this.props.order, this.props.pizzaList, hasEnded)}
          {inFuture || hasEnded || (this.props.order && this.props.order.paid) ||
            this.getPizzaList(this.props.pizzaList, !!this.props.order)}
        </View>
      </ScrollView>
    );
  }
}

Pizza.propTypes = {
  success: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  hasLoaded: PropTypes.bool.isRequired,
  event: PropTypes.shape({
    start: PropTypes.string.isRequired,
    end: PropTypes.string.isRequired,
    event: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  order: PropTypes.shape({
    pk: PropTypes.number.isRequired,
    paid: PropTypes.bool.isRequired,
    product: PropTypes.number.isRequired,
    name: PropTypes.string,
    member: PropTypes.number,
  }),
  pizzaList: PropTypes.arrayOf(PropTypes.shape({
    pk: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    available: PropTypes.bool.isRequired,
  })).isRequired,
  retrievePizzaInfo: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  orderPizza: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

Pizza.defaultProps = {
  event: null,
  order: null,
};

const mapStateToProps = state => ({
  success: state.pizza.success,
  loading: state.pizza.loading,
  hasLoaded: state.pizza.hasLoaded,
  event: state.pizza.event,
  order: state.pizza.order,
  pizzaList: state.pizza.pizzaList,
});

const mapDispatchToProps = dispatch => ({
  retrievePizzaInfo: () => dispatch(retrievePizzaInfo()),
  cancelOrder: () => dispatch(cancelOrder()),
  orderPizza: (pk, hasOrder) => dispatch(orderPizza(pk, hasOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(translate('pizza')(Pizza));
