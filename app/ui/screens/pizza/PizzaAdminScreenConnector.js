import { connect } from 'react-redux';
import * as pizzaActions from '../../../actions/pizza';
import PizzaAdminScreen from './PizzaAdminScreen';

const mapStateToProps = state => ({
  orders: state.pizza.admin.orders,
  status: state.pizza.admin.status,
  loading: state.pizza.admin.loading,
});

const mapDispatchToProps = {
  retrieveOrders: pizzaActions.retrieveOrders,
  updateOrder: pizzaActions.updateOrder,
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaAdminScreen);
