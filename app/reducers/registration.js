import * as registrationActions from '../actions/registration';

const initialState = {
  registration: 0,
  fields: {},
  status: 'loading',
};

function updateFields(fields, values) {
  /**
   * Updates the registration fields with the newly entered values.
   */
  const newFields = {};
  Object.keys(values).forEach((key) => {
    newFields[key] = {
      ...fields[key],
      value: values[key],
    };
  });
  return newFields;
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case registrationActions.SHOW_FIELDS: {
      return {
        registration: action.payload.registration,
        fields: action.payload.fields,
        status: 'success',
      };
    }
    case registrationActions.UPDATE: {
      return {
        ...state,
        fields: updateFields(state.fields, action.payload.fields),
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
    case registrationActions.FIELDS: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
