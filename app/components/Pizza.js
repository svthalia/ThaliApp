import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import 'moment/locale/nl';
import LoadingScreen from './LoadingScreen';

import { retrievePizzaInfo, cancelOrder, orderPizza } from '../actions/pizza';
import styles from './style/pizza';

class Pizza extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  getProductFromList = (pk, pizzaList) => {
    for (let i = 0; i < pizzaList.length; i += 1) {
      if (pizzaList[i].pk === pk) {
        return pizzaList[i];
      }
    }
    return null;
  };

  getOrder = (order, pizzaList, hasEnded) => {
    if (order) {
      const productInfo = this.getProductFromList(order.product, pizzaList);

      if (hasEnded) {
        return (
          <View>
            <View
              style={[
                styles.currentOrder,
                order.paid ? styles.greenBackground : styles.redBackground,
              ]}
            >
              <Text
                style={order.paid ? styles.paidStatus : styles.notPaidStatus}
              >The order has {order.paid || 'not yet '}been paid for.</Text>
              <Text
                style={[
                  styles.finalOrder,
                  order.paid ? styles.greenText : styles.whiteText,
                ]}
              >{productInfo.name}</Text>
            </View>
            <Text style={styles.subtitle}>You can no longer cancel.</Text>
          </View>
        );
      }
      return (
        <View style={styles.currentOrder}>
          <Text
            style={order.paid ? styles.paidStatus : styles.notPaidStatus}
          >The order has {order.paid || 'not yet '}been paid for.</Text>
          <View
            style={styles.currentOrderInfo}
          >
            <View>
              <Text style={styles.name}>{productInfo.name}</Text>
              <Text style={styles.description}>{productInfo.description}</Text>
              <Text style={styles.price}>€{productInfo.price}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => this.props.cancelOrder(this.props.token)}
                style={[styles.button, order.paid && styles.disabled]}
                disabled={order.paid}
              >
                <Text style={styles.buttonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else if (hasEnded) {
      return <Text>You did not place an order.</Text>;
    }
    return null;
  };

  getPizzaList = (pizzaList, hasOrder) => [(
    hasOrder && <Text
      key="description"
      style={styles.title}
    >Changing your order</Text>
  ), (
    <View key="content" style={styles.pizzaCard}>
      {pizzaList.map(pizza => (
        <View
          key={pizza.pk}
          style={styles.pizzaDetail}
        >
          <View>
            <Text style={styles.name}>{pizza.name}</Text>
            <Text style={styles.description}>{pizza.description}</Text>
            <Text style={styles.price}>€{pizza.price}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.orderPizza(this.props.token, pizza.pk, hasOrder)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>{hasOrder ? 'MODIFY' : 'ORDER'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )];

  handleRefresh = () => {
    this.setState({ refreshing: true });
    this.props.retrievePizzaInfo(this.props.token);
    this.setState({ refreshing: false });
  };

  render() {
    if (!this.props.hasLoaded) {
      return <LoadingScreen />;
    } else if (!this.props.success) {
      return <Text>Something went wrong.</Text>;
    }
    if (!this.props.event) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.handleRefresh}
            />
          }
        >
          <Text
            style={styles.title}
          >There is currently no event for which you can order food.</Text>
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
      subtitle = `It will be possible to order from ${start.format('HH:mm')}`;
    } else if (hasEnded) {
      subtitle = `It was possible to order until ${end.format('HH:mm')}`;
    } else {
      subtitle = `You can order until ${end.format('HH:mm')}`;
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        }
      >
        <View style={styles.content}>
          <Text style={styles.title}>Order pizza for {this.props.event.title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
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
  token: PropTypes.string.isRequired,
  retrievePizzaInfo: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  orderPizza: PropTypes.func.isRequired,
};

Pizza.defaultProps = {
  event: null,
  order: null,
};

const mapStateToProps = state => ({
  success: state.pizza.success,
  hasLoaded: state.pizza.success,
  event: state.pizza.event,
  order: state.pizza.order,
  pizzaList: state.pizza.pizzaList,
  token: state.session.token,
});

const mapDispatchToProps = dispatch => ({
  retrievePizzaInfo: token => dispatch(retrievePizzaInfo(token)),
  cancelOrder: token => dispatch(cancelOrder(token)),
  orderPizza: (token, pk, hasOrder) => dispatch(orderPizza(token, pk, hasOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pizza);
