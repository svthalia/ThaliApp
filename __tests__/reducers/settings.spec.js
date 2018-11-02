import reducer from '../../app/reducers/settings';
import { settingsActions, notificationsSettingsActions } from '../../app/actions/settings';

import pushNotifications from '../../app/reducers/settings/pushNotifications';

describe('settings reducer', () => {
  const emptyState = {};

  describe('initially', () => {
    const initialState = reducer();

    it('should return the initial state', () => {
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('is initializing', () => {
    const state = reducer(
      emptyState,
      settingsActions.initStart(),
    );

    it('should be loading', () => {
      expect(state).toHaveProperty('loading', true);
    });
  });

  describe('is initialized', () => {
    const state = reducer(
      emptyState,
      settingsActions.initComplete()
    );

    it('should not be loading', () => {
      expect(state).toHaveProperty('loading', false);
    });
  });

  describe('push notifications', () => {
    describe('initially', () => {
      const state = pushNotifications();

      it('should return the inital state', () => {
        expect(state).toMatchSnapshot();
      });
    });

    describe('is successful', () => {
      const state = reducer(
        emptyState,
        notificationsSettingsActions.success(['cat'])
      );

      it('should be successful', () => {
        expect(state.pushNotifications).toHaveProperty('status', 'success');
      });

      it('should contain the category list', () => {
        expect(state.pushNotifications).toHaveProperty('categoryList', ['cat']);
      });
    });

    describe('is failure', () => {
      const state = reducer(
        emptyState,
        notificationsSettingsActions.failure()
      );

      it('should be failure', () => {
        expect(state.pushNotifications).toHaveProperty('status', 'failure');
      });
    });
  });
});
