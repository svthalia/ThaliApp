import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import PizzaScreen from './PizzaScreen';

const mapStateToProps = state => ({
  success: state.pizza.success,
  loading: state.pizza.loading,
  hasLoaded: state.pizza.hasLoaded,
  event: state.pizza.event,
  order: state.pizza.order,
  pizzaList: state.pizza.pizzaList,
});

const mapDispatchToProps = {
  loadPizzas: pizzaActions.retrievePizzaInfo,
  cancelPizza: pizzaActions.cancelOrder,
  orderPizza: pizzaActions.orderPizza,
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaScreen);
