import * as actions from '../../app/actions/settings';

describe('base settings actions', () => {
  it('should expose the base settings actions', () => {
    expect(actions.settingsActions.OPEN).toEqual('SETTINGS_OPEN');
    expect(actions.settingsActions.INIT_START).toEqual('SETTINGS_INIT_START');
    expect(actions.settingsActions.INIT_COMPLETE).toEqual('SETTINGS_INIT_COMPLETE');
  });

  it('should create an action to open the settings screen', () => {
    expect(actions.settingsActions.open()).toMatchSnapshot();
  });

  it('should create an action to notify the settings screen is loading', () => {
    expect(actions.settingsActions.initStart()).toMatchSnapshot();
  });

  it('should create an action to notify the settings screen has finished loading', () => {
    expect(actions.settingsActions.initComplete()).toMatchSnapshot();
  });
});

describe('notifications settings actions', () => {
  it('should expose the notifications settings actions', () => {
    expect(actions.notificationsSettingsActions.SUCCESS).toEqual('SETTINGS_PUSH_NOTIFICATIONS_SUCCESS');
    expect(actions.notificationsSettingsActions.FAILURE).toEqual('SETTINGS_PUSH_NOTIFICATIONS_FAILURE');
    expect(actions.notificationsSettingsActions.SAVE_CATEGORIES).toEqual('SETTINGS_PUSH_NOTIFICATIONS_SAVE_CATEGORIES');
  });

  it('should create an action to notify the notifications settings were fetched successfully', () => {
    expect(actions.notificationsSettingsActions.success([{ key: 'general', name: 'General' }])).toMatchSnapshot();
  });

  it('should create an action to notify of a failure fetching the notifications settings', () => {
    expect(actions.notificationsSettingsActions.failure()).toMatchSnapshot();
  });

  it('should create an action to save the push notifications category preferences', () => {
    expect(actions.notificationsSettingsActions.saveCategories(['general'])).toMatchSnapshot();
  });
});
