import { Dimensions } from 'react-native';
import { call, put, takeEvery } from 'redux-saga/effects';

import { TOTAL_BAR_HEIGHT } from '../ui/components/standardHeader/style/StandardHeader';
import { memberSize } from '../ui/screens/memberList/style/MemberList';

import * as memberActions from '../actions/members';
import reportError from '../utils/errorReporting';
import { getRequest } from './utils/api';

const members = function* members(action) {
  const { keywords } = action.payload;

  yield put(memberActions.fetching());

  const { height } = Dimensions.get('window');
  const amountOfRows = Math.floor((height - TOTAL_BAR_HEIGHT) / (memberSize + 16));

  const params = {
    limit: amountOfRows * 6,
  };
  if (keywords) {
    params.search = keywords;
  }

  try {
    const response = yield call(getRequest, 'members', params);
    yield put(memberActions.success(response.results, response.next, keywords));
  } catch (error) {
    yield call(reportError, error);
    yield put(memberActions.failure());
  }
};

const more = function* more(action) {
  const { url } = action.payload;

  yield put(memberActions.fetching());

  try {
    const response = yield call(getRequest, url);
    yield put(memberActions.moreSuccess(response.results, response.next));
  } catch (error) {
    yield call(reportError, error);
    yield put(memberActions.moreSuccess([], null));
  }
};

export default function* membersSaga() {
  yield takeEvery(memberActions.MEMBERS, members);
  yield takeEvery(memberActions.MORE, more);
}
