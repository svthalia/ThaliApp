import { Linking } from 'react-native';
import { takeEvery, call } from 'redux-saga/effects';
import * as navigationActions from '../actions/navigation';
import * as eventActions from '../actions/event';
import * as profileActions from '../actions/profile';
import * as pizzaActions from '../actions/pizza';
import * as registrationActions from '../actions/registration';
import * as sessionActions from '../actions/session';
import * as calendarActions from '../actions/calendar';
import * as membersActions from '../actions/members';
import * as welcomeActions from '../actions/welcome';
import { settingsActions } from '../actions/settings';
import NavigationService from '../navigation';

function* navigate(routeName) {
  yield call(NavigationService.navigate, routeName);
}

function* back() {
  yield call(NavigationService.goBack);
}

function* toggleDrawer() {
  yield call(NavigationService.toggleDrawer);
}

function openWebsite({ payload: url }) {
  Linking.openURL(url);
}

export default function* () {
  yield takeEvery(navigationActions.BACK, back);
  yield takeEvery(navigationActions.TOGGLE_DRAWER, toggleDrawer);
  yield takeEvery(navigationActions.OPEN_WEBSITE, openWebsite);
  yield takeEvery(welcomeActions.OPEN, navigate, 'Welcome');
  yield takeEvery(settingsActions.OPEN, navigate, 'Settings');
  yield takeEvery(calendarActions.OPEN, navigate, 'Calendar');
  yield takeEvery(membersActions.MEMBERS, navigate, 'MemberList');
  yield takeEvery(eventActions.OPEN, navigate, 'Event');
  yield takeEvery(eventActions.ADMIN, navigate, 'EventAdmin');
  yield takeEvery(profileActions.PROFILE, navigate, 'Profile');
  yield takeEvery(registrationActions.FIELDS, navigate, 'Registration');
  yield takeEvery(registrationActions.SUCCESS, back);
  yield takeEvery(pizzaActions.PIZZA, navigate, 'Pizza');
  yield takeEvery(sessionActions.SIGNED_IN, navigate, 'SignedIn');
  yield takeEvery([sessionActions.TOKEN_INVALID, sessionActions.SIGN_OUT], navigate, 'Auth');
}
