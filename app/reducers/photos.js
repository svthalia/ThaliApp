import * as photosActions from '../actions/photos';

export const STATUS_INITIAL = 'initial';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILURE = 'failure';

const initialState = {
  albums: {
    keywords: undefined,
    status: STATUS_INITIAL,
    fetching: true,
    data: [],
  },
  album: {
    status: STATUS_INITIAL,
    fetching: true,
    data: {},
    selection: undefined,
  },
};

export default function photos(state = initialState, { type, payload }) {
  switch (type) {
    case photosActions.PHOTOS_ALBUMS_FETCHING:
      return {
        ...state,
        albums: {
          ...state.albums,
          fetching: true,
        },
      };
    case photosActions.PHOTOS_ALBUMS_LOAD:
      return {
        ...state,
        albums: {
          ...state.albums,
          keywords: payload.keywords,
        },
      };
    case photosActions.PHOTOS_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: {
          ...state.albums,
          status: STATUS_SUCCESS,
          fetching: false,
          data: payload.isNext ? [...state.albums.data, ...payload.data] : payload.data,
          next: payload.next,
        },
      };
    case photosActions.PHOTOS_ALBUMS_FAILURE:
      return {
        ...state,
        albums: {
          ...state.albums,
          status: STATUS_FAILURE,
          fetching: false,
          data: [],
        },
      };
    case photosActions.PHOTOS_ALBUM_FETCHING:
      return {
        ...state,
        album: initialState.album,
      };
    case photosActions.PHOTOS_ALBUM_SUCCESS:
      return {
        ...state,
        album: {
          status: STATUS_SUCCESS,
          fetching: false,
          data: payload.data,
          selection: undefined,
        },
      };
    case photosActions.PHOTOS_ALBUM_FAILURE:
      return {
        ...state,
        album: {
          status: STATUS_FAILURE,
          fetching: false,
          data: {},
          selection: undefined,
        },
      };
    case photosActions.PHOTOS_GALLERY_OPEN:
      return {
        ...state,
        album: {
          ...state.album,
          selection: payload.selection,
        },
      };
    default:
      return state;
  }
}
