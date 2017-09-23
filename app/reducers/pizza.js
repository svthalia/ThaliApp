import * as pizzaActions from '../actions/pizza';

const initialState = {
  success: false,
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
        hasLoaded: true,
        event: action.payload.event,
        order: action.payload.order,
        pizzaList: action.payload.pizzaList,
      };
    case pizzaActions.FAILURE:
      return {
        ...state,
        success: false,
        hasLoaded: true,
      };
    case pizzaActions.FETCHING:
      return {
        ...state,
        hasLoaded: false,
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
