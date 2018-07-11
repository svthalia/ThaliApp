// Group setting sections together to prepare for more submenus to be added.
export const pushNotificationsSettingsActions = {
  RETRIEVE: 'SETTINGS_PUSH_NOTIFICATIONS',
  LOADING: 'SETTINGS_PUSH_NOTIFICATIONS_LOADING',
  SUCCESS: 'SETTINGS_PUSH_NOTIFICATIONS_SUCCESS',
  FAILURE: 'SETTINGS_PUSH_NOTIFICATIONS_FAILURE',
  SAVE_CATEGORIES: 'SETTINGS_PUSH_NOTIFICATIONS_SAVE_CATEGORIES',

  retrieve: () => ({
    type: pushNotificationsSettingsActions.RETRIEVE,
  }),
  loading: () => ({
    type: pushNotificationsSettingsActions.LOADING,
  }),
  success: categoryList => ({
    type: pushNotificationsSettingsActions.SUCCESS,
    categoryList,
  }),
  failure: () => ({
    type: pushNotificationsSettingsActions.FAILURE,
  }),
  saveCategories: categories => ({
    type: pushNotificationsSettingsActions.SAVE_CATEGORIES,
    categories,
  }),
};
