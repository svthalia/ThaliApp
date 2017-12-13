import * as registrationActions from '../actions/registration';

const initialState = {
  registration: 0,
  fields: {},
  status: 'success',
};


export default function navigate(state = initialState, action = {}) {
  switch (action.type) {
    case registrationActions.SHOW_FIELDS: {
      return {
        registration: action.payload.registration,
        fields: action.payload.fields,
        status: 'success',
      };
    }
    case registrationActions.SUCCESS: {
      return {
        ...state,
        status: 'success',
      };
    }
    case registrationActions.LOADING: {
      return {
        ...state,
        status: 'loading',
      };
    }
    case registrationActions.FAILURE: {
      return {
        ...state,
        status: 'failure',
      };
    }
    default:
      return state;
  }
}
