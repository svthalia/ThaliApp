import { pushNotificationsSettingsActions } from '../actions/settings';

const initialState = {
  pushNotifications: {
    categoryList: [],
    status: 'loading',
  },
};

export default function settings(state = initialState, action = {}) {
  switch (action.type) {
    case pushNotificationsSettingsActions.LOADING: {
      return {
        ...state,
        pushNotifications: {
          ...state.pushNotifications,
          status: 'loading',
        },
      };
    }
    case pushNotificationsSettingsActions.SUCCESS: {
      return {
        ...state,
        pushNotifications: {
          ...state.pushNotifications,
          categoryList: action.categoryList,
          status: 'success',
        },
      };
    }
    case pushNotificationsSettingsActions.FAILURE: {
      return {
        ...state,
        pushNotifications: {
          ...state.pushNotifications,
          status: 'failure',
        },
      };
    }
    default: {
      return state;
    }
  }
}
