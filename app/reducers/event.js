import * as eventActions from '../actions/event';

const initialState = {
  data: {
    pk: -1,
    title: '',
    description: '',
    start: '',
    end: '',
    organiser: -1,
    category: '',
    location: '',
    map_location: '',
    registration_allowed: false,
    has_fields: false,
    is_pizza_event: false,
    google_maps_url: '',
  },
  registrations: [],
  status: 'initial',
  loading: false,
};

export default function loadEvent(state = initialState, action = {}) {
  switch (action.type) {
    case eventActions.FETCHING: {
      return {
        ...initialState,
        loading: true,
      };
    }
    case eventActions.SUCCESS:
      return {
        ...state,
        data: action.payload.eventData,
        registrations: action.payload.eventRegistrations,
        status: 'success',
        loading: false,
      };
    case eventActions.FAILURE:
      return {
        ...state,
        status: 'failure',
        loading: false,
      };
    case eventActions.DONE:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
