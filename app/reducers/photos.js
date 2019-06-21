import * as photosActions from '../actions/photos';

export const STATUS_INITIAL = 'initial';
export const STATUS_SUCCESS = 'success';
export const STATUS_FAILURE = 'failure';

const initialState = {
  albums: {
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

export default function photos(state = initialState, action = {}) {
  switch (action.type) {
    case photosActions.PHOTOS_ALBUMS_FETCHING:
      return {
        ...state,
        albums: initialState.albums,
      };
    case photosActions.PHOTOS_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: {
          status: STATUS_SUCCESS,
          fetching: false,
          data: action.payload.albums,
          more: action.payload.more,
        },
      };
    case photosActions.PHOTOS_ALBUMS_FAILURE:
      return {
        ...state,
        albums: {
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
          data: action.payload,
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
          selection: action.payload.selection,
        },
      };
    default:
      return state;
  }
}
