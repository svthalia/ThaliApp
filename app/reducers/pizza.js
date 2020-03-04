import * as pizzaActions from '../actions/pizza';

const initialState = {
  success: false,
  loading: false,
  hasLoaded: false,
  event: null,
  order: null,
  pizzaList: [],
  admin: {
    loading: false,
    status: 'initial',
    orders: [],
  },
};

export default function pizza(state = initialState, action = {}) {
  switch (action.type) {
    case pizzaActions.SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        hasLoaded: true,
        event: action.payload.event,
        order: action.payload.order,
        pizzaList: action.payload.pizzaList,
      };
    case pizzaActions.FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        hasLoaded: true,
      };
    case pizzaActions.FETCHING:
      return {
        ...state,
        loading: true,
      };
    case pizzaActions.CANCEL_SUCCESS:
      return {
        ...state,
        order: null,
      };
    case pizzaActions.ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload.order,
      };
    case pizzaActions.ADMIN_LOADING:
      return {
        ...state,
        admin: {
          ...state.admin,
          loading: true,
        },
      };
    case pizzaActions.ADMIN_SUCCESS:
      return {
        ...state,
        admin: {
          loading: false,
          status: 'success',
          orders: action.payload.orders,
        },
      };
    case pizzaActions.ADMIN_FAILURE:
      return {
        ...state,
        admin: {
          ...initialState.admin,
          status: 'failure',
        },
      };
    default:
      return state;
  }
}
