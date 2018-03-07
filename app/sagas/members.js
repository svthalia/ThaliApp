import { Dimensions } from 'react-native';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { TOTAL_BAR_HEIGHT } from '../components/style/standardHeader';
import { memberSize } from '../components/style/memberList';

import { apiRequest, tokenSelector } from '../url';
import * as memberActions from '../actions/members';

const members = function* members(action) {
  const { keywords } = action.payload;
  const token = yield select(tokenSelector);

  yield put(memberActions.fetching());

  const { height } = Dimensions.get('window');
  const amountOfRows = Math.floor((height - TOTAL_BAR_HEIGHT) / (memberSize + 16));

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  const params = {
    limit: amountOfRows * 6,
  };
  if (keywords) {
    params.search = keywords;
  }

  try {
    const response = yield call(apiRequest, 'members', data, params);
    yield put(memberActions.success(response.results, response.next, keywords));
  } catch (error) {
    yield put(memberActions.failure());
  }
};

const more = function* more(action) {
  const { url } = action.payload;
  const token = yield select(tokenSelector);

  yield put(memberActions.fetching());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const responseJson = yield fetch(url, data).then(response => response.json());
    yield put(memberActions.moreSuccess(responseJson.results, responseJson.next));
  } catch (error) {
    yield put(memberActions.moreSuccess([], null));
  }
};

const membersSaga = function* membersSaga() {
  yield takeEvery(memberActions.MEMBERS, members);
  yield takeEvery(memberActions.MORE, more);
};

export default membersSaga;
