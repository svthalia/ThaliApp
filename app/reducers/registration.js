import * as registrationActions from '../actions/registration';

const initialState = {
  registration: 0,
  fields: {},
};


export default function navigate(state = initialState, action = {}) {
  switch (action.type) {
    case registrationActions.SHOW_FIELDS: {
      return {
        registration: action.payload.registration,
        fields: action.payload.fields,
      };
    }
    default:
      return state;
  }
}
