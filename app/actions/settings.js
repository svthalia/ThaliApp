// Actions are grouped based on the settings sections

export const settingsActions = {
  OPEN: 'SETTINGS_OPEN',
  INIT_START: 'SETTINGS_INIT_START',
  INIT_COMPLETE: 'SETTINGS_INIT_COMPLETE',
  open: () => ({
    type: settingsActions.OPEN,
  }),
  initStart: () => ({
    type: settingsActions.INIT_START,
  }),
  initComplete: () => ({
    type: settingsActions.INIT_COMPLETE,
  }),
};

export const notificationsSettingsActions = {
  SUCCESS: 'SETTINGS_PUSH_NOTIFICATIONS_SUCCESS',
  FAILURE: 'SETTINGS_PUSH_NOTIFICATIONS_FAILURE',
  SAVE_CATEGORIES: 'SETTINGS_PUSH_NOTIFICATIONS_SAVE_CATEGORIES',

  success: categoryList => ({
    type: notificationsSettingsActions.SUCCESS,
    categoryList,
  }),
  failure: () => ({
    type: notificationsSettingsActions.FAILURE,
  }),
  saveCategories: categories => ({
    type: notificationsSettingsActions.SAVE_CATEGORIES,
    categories,
  }),
};
