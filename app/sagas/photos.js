import { call, put, takeEvery } from 'redux-saga/effects';

import Share from 'react-native-share';
import * as RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import * as photosActions from '../actions/photos';
import { getRequest } from './utils/api';

function* loadAlbums({ payload: { keywords, next } }) {
  yield put(photosActions.fetchingAlbums());

  const params = {
    limit: 12,
  };

  if (keywords) {
    params.search = keywords;
  }

  try {
    let response;
    if (next) {
      response = yield call(getRequest, next);
    } else {
      response = yield call(getRequest, 'photos/albums', params);
    }
    yield put(
      photosActions.successAlbums(
        response.results.filter(
          (item) => item.accessible && !item.hidden && item.cover != null
        ),
        response.next,
        next !== undefined
      )
    );
  } catch (error) {
    yield put(photosActions.failureAlbums());
  }
}

function* loadAlbum(action) {
  const { pk, slug } = action.payload;

  yield put(photosActions.fetchingAlbum());

  try {
    let album;
    if (pk !== undefined) {
      album = yield call(getRequest, `photos/albums/${pk}`);
    } else {
      const albums = yield call(getRequest, 'photos/albums', {
        search: slug,
      });
      album = yield call(getRequest, `photos/albums/${albums[0].pk}`);
    }

    if (album !== undefined) {
      yield put(photosActions.successAlbum(album));
    } else {
      yield put(photosActions.failureAlbum());
    }
  } catch (error) {
    yield put(photosActions.failureAlbum());
  }
}

const downloadFile = (fromUrl, toFile) =>
  RNFS.downloadFile({
    fromUrl,
    toFile,
  }).promise;

function* downloadPhotoToFile(url, root = RNFS.DocumentDirectoryPath) {
  const toFile = `${root}/photo-download.jpg`;
  const result = yield call(downloadFile, url, toFile);
  if (result.statusCode === 200) {
    return toFile;
  }
  return null;
}

function* downloadPhoto({ payload: { url } }) {
  const file = yield call(downloadPhotoToFile, url, RNFS.PicturesDirectoryPath);
  if (file === null) {
    return;
  }
  yield call([Snackbar, 'show'], { text: 'Photo has been saved successfully' });
}

function* sharePhoto({ payload: { url } }) {
  const file = yield call(downloadPhotoToFile, url);
  if (file === null) {
    return;
  }
  const data = yield call([RNFS, 'readFile'], file, 'base64');
  try {
    yield call([Share, 'open'], {
      url: `data:image/png;base64,${data}`,
    });
    // Error is thrown when a share is cancelled
    // eslint-disable-next-line no-empty
  } catch (e) {}
}

export default function* photosSaga() {
  yield takeEvery(photosActions.PHOTOS_ALBUMS_OPEN, loadAlbums);
  yield takeEvery(photosActions.PHOTOS_ALBUMS_LOAD, loadAlbums);
  yield takeEvery(photosActions.PHOTOS_ALBUM_OPEN, loadAlbum);
  yield takeEvery(photosActions.PHOTOS_PHOTO_DOWNLOAD, downloadPhoto);
  yield takeEvery(photosActions.PHOTOS_PHOTO_SHARE, sharePhoto);
}
