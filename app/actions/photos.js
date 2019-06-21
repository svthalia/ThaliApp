export const PHOTOS_ALBUMS_OPEN = 'PHOTOS_ALBUMS_OPEN';
export const PHOTOS_ALBUMS_SUCCESS = 'PHOTOS_ALBUMS_SUCCESS';
export const PHOTOS_ALBUMS_FAILURE = 'PHOTOS_ALBUMS_FAILURE';
export const PHOTOS_ALBUMS_FETCHING = 'PHOTOS_ALBUMS_FETCHING';
export const PHOTOS_ALBUM_OPEN = 'PHOTOS_ALBUM_OPEN';
export const PHOTOS_ALBUM_SUCCESS = 'PHOTOS_ALBUM_SUCCESS';
export const PHOTOS_ALBUM_FAILURE = 'PHOTOS_ALBUM_FAILURE';
export const PHOTOS_ALBUM_FETCHING = 'PHOTOS_ALBUM_FETCHING';
export const PHOTOS_PHOTO_SHOW = 'PHOTOS_PHOTO_SHOW';
export const PHOTOS_GALLERY_OPEN = 'PHOTOS_GALLERY_OPEN';

export function openAlbums() {
  return {
    type: PHOTOS_ALBUMS_OPEN,
  };
}

export function successAlbums(albums, more) {
  return {
    type: PHOTOS_ALBUMS_SUCCESS,
    payload: { albums, more },
  };
}

export function failureAlbums() {
  return { type: PHOTOS_ALBUMS_FAILURE };
}

export function fetchingAlbums() {
  return {
    type: PHOTOS_ALBUMS_FETCHING,
  };
}

export function openGallery(selection) {
  return {
    type: PHOTOS_GALLERY_OPEN,
    payload: { selection },
  };
}

export function openAlbum(pk) {
  return {
    type: PHOTOS_ALBUM_OPEN,
    payload: { pk },
  };
}

export function openAlbumWithSlug(slug) {
  return {
    type: PHOTOS_ALBUM_OPEN,
    payload: { slug },
  };
}

export function successAlbum(album) {
  return {
    type: PHOTOS_ALBUM_SUCCESS,
    payload: album,
  };
}

export function failureAlbum() {
  return { type: PHOTOS_ALBUM_FAILURE };
}

export function fetchingAlbum() {
  return {
    type: PHOTOS_ALBUM_FETCHING,
  };
}

export function showPhoto(photo) {
  return {
    type: PHOTOS_PHOTO_SHOW,
    payload: photo,
  };
}
