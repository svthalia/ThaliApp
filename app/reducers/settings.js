import pushNotifications, { initialState as initialPushNotificationsState } from './settings/pushNotifications';
import { settingsActions } from '../actions/settings';

const initialState = {
  pushNotifications: initialPushNotificationsState,
  loading: true,
};

export default function calendar(state = initialState, action = {}) {
  switch (action.type) {
    case settingsActions.INIT_START:
      return {
        ...state,
        loading: true,
      };
    case settingsActions.INIT_COMPLETE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
        pushNotifications: pushNotifications(state.pushNotifications, action),
      };
  }
}
