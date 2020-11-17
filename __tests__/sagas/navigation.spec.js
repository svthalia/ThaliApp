import { expectSaga } from 'redux-saga-test-plan';

import navigationSaga from '../../app/sagas/navigation';
import * as navigationActions from '../../app/actions/navigation';

import * as eventActions from '../../app/actions/event';
import * as profileActions from '../../app/actions/profile';
import * as pizzaActions from '../../app/actions/pizza';
import * as registrationActions from '../../app/actions/registration';
import * as sessionActions from '../../app/actions/session';
import * as calendarActions from '../../app/actions/calendar';
import * as membersActions from '../../app/actions/members';
import * as welcomeActions from '../../app/actions/welcome';
import { settingsActions } from '../../app/actions/settings';

import {
  goBack,
  toggleDrawer,
  navigate,
} from '../../app/ui/components/navigation/RootNavigation';

jest.mock('../../app/ui/components/navigation/RootNavigation', () => ({
  goBack: jest.fn(),
  toggleDrawer: jest.fn(),
  navigate: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialIcons', () => ({
  propTypes: jest.fn(() => 'Icon'),
  defaultProps: jest.fn(),
  create: jest.fn(),
}));

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => ({
  CommunityIcon: 'CommunityIcon',
}));

jest.mock('react-native-snackbar', () => ({
  Snackbar: jest.fn(),
}));

describe('navigation saga', () => {
  describe('back saga', () => {
    it('should go back on a back action', () =>
      expectSaga(navigationSaga)
        .dispatch(navigationActions.goBack())
        .silentRun()
        .then(() => {
          expect(goBack).toBeCalled();
        }));

    it('should go back when a registration is saved', () =>
      expectSaga(navigationSaga)
        .dispatch(registrationActions.success())
        .silentRun()
        .then(() => {
          expect(goBack).toBeCalled();
        }));
  });

  describe('drawer saga', () => {
    it('should toggle the drawer on a toggle drawer action', () =>
      expectSaga(navigationSaga)
        .dispatch(navigationActions.toggleDrawer())
        .silentRun()
        .then(() => {
          expect(toggleDrawer).toBeCalled();
        }));
  });

  describe('navigation saga', () => {
    it('should open the welcome screen', () =>
      expectSaga(navigationSaga)
        .dispatch(welcomeActions.open())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Welcome');
        }));

    it('should open the settings screen', () =>
      expectSaga(navigationSaga)
        .dispatch(settingsActions.open())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Settings');
        }));

    it('should open the calendar screen', () =>
      expectSaga(navigationSaga)
        .dispatch(calendarActions.open())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Calendar');
        }));

    it('should open the members screen', () =>
      expectSaga(navigationSaga)
        .dispatch(membersActions.open())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('MemberList');
        }));

    it('should open the event screen', () =>
      expectSaga(navigationSaga)
        .dispatch(eventActions.open())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Event');
        }));

    it('should open the event admin screen', () =>
      expectSaga(navigationSaga)
        .dispatch(eventActions.admin())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('EventAdmin');
        }));

    it('should open the profile screen', () =>
      expectSaga(navigationSaga)
        .dispatch(profileActions.profile())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Profile');
        }));

    it('should open the registration screen', () =>
      expectSaga(navigationSaga)
        .dispatch(registrationActions.retrieveFields(1))
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Registration');
        }));

    it('should open the pizza screen', () =>
      expectSaga(navigationSaga)
        .dispatch(pizzaActions.retrievePizzaInfo())
        .silentRun()
        .then(() => {
          expect(navigate).toBeCalledWith('Pizza');
        }));
  });
});
