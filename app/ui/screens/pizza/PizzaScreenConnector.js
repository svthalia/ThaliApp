import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import { Payment } from '../../../sagas/pizza';
import PizzaScreen from './PizzaScreen';

const mapStateToProps = state => ({
  success: state.pizza.success,
  loading: state.pizza.loading,
  hasLoaded: state.pizza.hasLoaded,
  event: state.pizza.event,
  order: state.pizza.order && {
    ...state.pizza.order,
    paid: state.pizza.order.paid !== undefined
      ? state.pizza.order.paid : state.pizza.order.payment !== Payment.NONE,
  },
  pizzaList: state.pizza.pizzaList,
});

const mapDispatchToProps = {
  loadPizzas: pizzaActions.retrievePizzaInfo,
  cancelPizza: pizzaActions.cancelOrder,
  orderPizza: pizzaActions.orderPizza,
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaScreen);
