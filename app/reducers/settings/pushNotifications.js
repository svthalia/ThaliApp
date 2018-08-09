import { notificationsSettingsActions as actions } from '../../actions/settings';

export const initialState = {
  categoryList: [],
  status: 'loading',
};

export default function pushNotifications(state = initialState, action = {}) {
  switch (action.type) {
    case actions.SUCCESS:
      return {
        categoryList: action.categoryList,
        status: 'success',
      };
    case actions.FAILURE:
      return {
        ...state,
        status: 'failure',
      };
    default:
      return state;
  }
}
