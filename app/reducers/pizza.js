import * as pizzaActions from '../actions/pizza';

const initialState = {
  success: false,
  loading: false,
  hasLoaded: false,
  event: null,
  order: null,
  pizzaList: [],
};

export default function pizza(state = initialState, action = {}) {
  switch (action.type) {
    case pizzaActions.SUCCESS:
      return {
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
    default:
      return state;
  }
}
