import { takeEvery, call } from 'redux-saga/effects';
import * as eventActions from '../actions/event';
import * as profileActions from '../actions/profile';
import * as pizzaActions from '../actions/pizza';
import * as registrationActions from '../actions/registration';
import * as sessionActions from '../actions/session';
import NavigationService from '../navigation';

function* event() {
  yield call(NavigationService.navigate, 'Event');
}

function* profile() {
  yield call(NavigationService.navigate, 'Profile');
}

function* registration() {
  yield call(NavigationService.navigate, 'Registration');
}

function* pizza() {
  yield call(NavigationService.navigate, 'Pizza');
}

function* signedIn() {
  yield call(NavigationService.navigate, 'SignedIn');
}

function* auth() {
  yield call(NavigationService.navigate, 'Auth');
}

function* back() {
  yield call(NavigationService.goBack);
}

const routerSaga = function* eventSaga() {
  yield takeEvery(eventActions.EVENT, event);
  yield takeEvery(profileActions.PROFILE, profile);
  yield takeEvery(registrationActions.FIELDS, registration);
  yield takeEvery(registrationActions.SUCCESS, back);
  yield takeEvery(pizzaActions.PIZZA, pizza);
  yield takeEvery(sessionActions.SIGNED_IN, signedIn);
  yield takeEvery([sessionActions.TOKEN_INVALID, sessionActions.SIGN_OUT], auth);
};

export default routerSaga;
