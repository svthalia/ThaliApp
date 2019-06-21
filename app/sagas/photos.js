import {
  call, put, select, takeEvery,
} from 'redux-saga/effects';

import { apiRequest, tokenSelector } from '../utils/url';
import * as photosActions from '../actions/photos';

function* loadAlbums() {
  const token = yield select(tokenSelector);

  yield put(photosActions.fetchingAlbums());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  const params = {
    limit: 12,
  };

  try {
    const response = yield call(apiRequest, 'photos/albums', data, params);
    yield put(photosActions.successAlbums(
      response.results.filter(item => item.accessible && !item.hidden && item.cover != null),
      response.next,
    ));
  } catch (error) {
    yield put(photosActions.failureAlbums());
  }
}

function* loadAlbum(action) {
  const { pk } = action.payload;
  const token = yield select(tokenSelector);

  yield put(photosActions.fetchingAlbum());

  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  };

  try {
    const album = yield call(apiRequest, `photos/albums/${pk}`, data);

    yield put(photosActions.successAlbum(album));
  } catch (error) {
    yield put(photosActions.failureAlbum());
  }
}

export default function* photosSaga() {
  yield takeEvery(photosActions.PHOTOS_ALBUMS_OPEN, loadAlbums);
  yield takeEvery(photosActions.PHOTOS_ALBUM_OPEN, loadAlbum);
}
