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

import NavigationService from '../../app/navigation';

jest.mock('../../app/navigation', () => ({
  __esModule: true,
  default: {
    goBack: jest.fn(),
    toggleDrawer: jest.fn(),
    navigate: jest.fn(),
  },
}));

describe('navigation saga', () => {
  describe('back saga', () => {
    it('should go back on a back action', () => expectSaga(navigationSaga)
      .dispatch(navigationActions.goBack())
      .silentRun()
      .then(() => {
        expect(NavigationService.goBack).toBeCalled();
      }));

    it('should go back when a registration is saved', () => expectSaga(navigationSaga)
      .dispatch(registrationActions.success())
      .silentRun()
      .then(() => {
        expect(NavigationService.goBack).toBeCalled();
      }));
  });

  describe('drawer saga', () => {
    it('should toggle the drawer on a toggle drawer action', () => expectSaga(navigationSaga)
      .dispatch(navigationActions.toggleDrawer())
      .silentRun()
      .then(() => {
        expect(NavigationService.toggleDrawer).toBeCalled();
      }));
  });

  describe('navigation saga', () => {
    it('should open the welcome screen', () => expectSaga(navigationSaga)
      .dispatch(welcomeActions.open())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Welcome');
      }));

    it('should open the settings screen', () => expectSaga(navigationSaga)
      .dispatch(settingsActions.open())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Settings');
      }));

    it('should open the calendar screen', () => expectSaga(navigationSaga)
      .dispatch(calendarActions.open())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Calendar');
      }));

    it('should open the members screen', () => expectSaga(navigationSaga)
      .dispatch(membersActions.members())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('MemberList');
      }));

    it('should open the event screen', () => expectSaga(navigationSaga)
      .dispatch(eventActions.open())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Event');
      }));

    it('should open the event admin screen', () => expectSaga(navigationSaga)
      .dispatch(eventActions.admin())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('EventAdmin');
      }));

    it('should open the profile screen', () => expectSaga(navigationSaga)
      .dispatch(profileActions.profile())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Profile');
      }));

    it('should open the registration screen', () => expectSaga(navigationSaga)
      .dispatch(registrationActions.retrieveFields(1))
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Registration');
      }));

    it('should open the pizza screen', () => expectSaga(navigationSaga)
      .dispatch(pizzaActions.retrievePizzaInfo())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Pizza');
      }));

    it('should switch to the signed in navigator', () => expectSaga(navigationSaga)
      .dispatch(sessionActions.signedIn('user', 'token'))
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('SignedIn');
      }));

    it('should sign out with invalid token', () => expectSaga(navigationSaga)
      .dispatch(sessionActions.tokenInvalid())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Auth');
      }));

    it('should sign out on a sign out action', () => expectSaga(navigationSaga)
      .dispatch(sessionActions.signOut())
      .silentRun()
      .then(() => {
        expect(NavigationService.navigate).toBeCalledWith('Auth');
      }));
  });
});
