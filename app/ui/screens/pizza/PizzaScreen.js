import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  RefreshControl, ScrollView, Text, TouchableHighlight, View,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Moment from 'moment';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import ErrorScreen from '../../components/errorScreen/ErrorScreen';
import styles from './style/PizzaScreen';
import Colors from '../../style/Colors';
import { withStandardHeader } from '../../components/standardHeader/StandardHeader';
import CardSection from '../../components/cardSection/CardSection';

class PizzaScreen extends Component {
  getProductFromList = (pk, pizzaList) => {
    for (let i = 0; i < pizzaList.length; i += 1) {
      if (pizzaList[i].pk === pk) {
        return pizzaList[i];
      }
    }
    return null;
  };

  getEventInfo = (subtitle) => {
    const { t, event } = this.props;

    return (
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>
          {t('Order pizza for {{title}}', { title: event.title })}
        </Text>
        <Text style={styles.eventSubtitle}>
          {subtitle}
        </Text>
      </View>
    );
  };

  getOverview = () => {
    const { order, pizzaList, t } = this.props;

    if (order) {
      const productInfo = this.getProductFromList(order.product, pizzaList);
      return (
        <View
          style={[
            styles.overviewContainer,
            order.paid ? styles.greenBackground : styles.redBackground,
          ]}
        >
          <Text
            style={styles.overviewText}
            numberOfLines={3}
          >
            {productInfo.name}
          </Text>
        </View>
      );
    }
    return (
      <Text style={styles.overviewNoOrder}>
        {t('You did not place an order.')}
      </Text>
    );
  };

  getOrder = (hasEnded) => {
    const {
      t, cancelPizza, order, pizzaList,
    } = this.props;

    if (order) {
      const productInfo = this.getProductFromList(order.product, pizzaList);

      return (
        <CardSection sectionHeader={t('Current order')}>
          <View
            style={[styles.orderStatus, order.paid ? styles.paidStatus : styles.notPaidStatus]}
          >
            <Text style={styles.orderStatusText}>
              {order.paid && t('The order has been paid for.')}
              {!order.paid && t('The order has not yet been paid for.')}
            </Text>
          </View>
          <View style={[styles.pizzaContainer, styles.orderedPizzaContainer]}>
            <View style={styles.pizzaInfo}>
              <Text style={styles.pizzaName}>
                {productInfo.name}
              </Text>
              <Text style={styles.pizzaDescription}>
                {productInfo.description}
              </Text>
              <Text style={styles.pizzaPrice}>
                €
                {productInfo.price}
              </Text>
            </View>
            {(!order.paid && !hasEnded) && (
              <TouchableHighlight
                onPress={() => cancelPizza()}
                style={styles.button}
                underlayColor={Colors.darkMagenta}
              >
                <Icon
                  name="delete"
                  color={Colors.white}
                  size={18}
                />
              </TouchableHighlight>
            )}
          </View>
        </CardSection>
      );
    }
    return null;
  };

  getPizzaList = (pizzaList, hasOrder) => (
    <CardSection sectionHeader={hasOrder ? this.props.t('Changing your order') : null} contentStyle={styles.pizzaList}>
      {pizzaList.map((pizza, i) => (
        <View
          key={pizza.pk}
          style={i === 0 ? styles.pizzaContainer : [styles.borderTop, styles.pizzaContainer]}
        >
          <View style={styles.pizzaInfo}>
            <Text style={styles.pizzaName}>
              {pizza.name}
            </Text>
            <Text style={styles.pizzaDescription}>
              {pizza.description}
            </Text>
            <Text style={styles.pizzaPrice}>
              €
              {pizza.price}
            </Text>
          </View>
          <TouchableHighlight
            onPress={() => {
              this.props.orderPizza(pizza.pk, hasOrder);
              this.pizzaScroll.scrollTo({ x: 0, y: 0, animated: true });
            }}
            style={styles.button}
            underlayColor={Colors.darkMagenta}
          >
            <Icon
              name="add-shopping-cart"
              color={Colors.white}
              size={18}
            />
          </TouchableHighlight>
        </View>
      ))}
    </CardSection>
  );

  handleRefresh = () => {
    const { loadPizzas } = this.props;
    loadPizzas();
  };

  render() {
    const {
      hasLoaded, success, event, loading, t, pizzaList, order,
    } = this.props;

    if (!hasLoaded) {
      return <LoadingScreen />;
    } if (!success) {
      return (
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.handleRefresh}
            />
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <ErrorScreen message={this.props.t('Sorry! We couldn\'t load any data.')} />
        </ScrollView>
      );
    } if (!event) {
      return (
        <ScrollView
          refreshControl={(
            <RefreshControl
              refreshing={loading}
              onRefresh={this.handleRefresh}
            />
          )}
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          <Text
            style={styles.title}
          >
            {t('There is currently no event for which you can order food.')}
          </Text>
        </ScrollView>
      );
    }

    const start = Moment(event.start);
    const end = Moment(event.end);
    const now = Moment();

    const inFuture = start.diff(now, 'm') > 0;
    const hasEnded = end.diff(now, 'm') < 0;

    let subtitle;
    if (inFuture) {
      subtitle = t(`It will be possible to order from ${start.format('HH:mm')}`);
    } else if (hasEnded) {
      subtitle = t(`It was possible to order until ${end.format('HH:mm')}`);
    } else {
      subtitle = t(`You can order until ${end.format('HH:mm')}`);
    }

    return (
      <ScrollView
        refreshControl={(
          <RefreshControl
            refreshing={loading}
            onRefresh={this.handleRefresh}
          />
        )}
        ref={(ref) => { this.pizzaScroll = ref; }}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          {this.getEventInfo(subtitle)}
          {hasEnded && this.getOverview()}
          {this.getOrder(hasEnded)}
          {inFuture || hasEnded || (order && order.paid)
            || this.getPizzaList(pizzaList, !!order)}
        </View>
      </ScrollView>
    );
  }
}

PizzaScreen.propTypes = {
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
  loadPizzas: PropTypes.func.isRequired,
  cancelPizza: PropTypes.func.isRequired,
  orderPizza: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

PizzaScreen.defaultProps = {
  event: null,
  order: null,
};

export default withTranslation('screens/pizza/PizzaScreen')(withStandardHeader(PizzaScreen));
