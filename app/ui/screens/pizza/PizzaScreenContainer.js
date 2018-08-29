import { connect } from 'react-redux';
import { cancelOrder, orderPizza, retrievePizzaInfo } from '../../../actions/pizza';
import PizzaScreen from './PizzaScreen';

const mapStateToProps = state => ({
  success: state.pizza.success,
  loading: state.pizza.loading,
  hasLoaded: state.pizza.hasLoaded,
  event: state.pizza.event,
  order: state.pizza.order,
  pizzaList: state.pizza.pizzaList,
});

const mapDispatchToProps = dispatch => ({
  loadPizzas: () => dispatch(retrievePizzaInfo()),
  cancelPizza: () => dispatch(cancelOrder()),
  orderPizza: (pk, hasOrder) => dispatch(orderPizza(pk, hasOrder)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PizzaScreen);
