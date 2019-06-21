export const photosStore = state => state.photos;

export const albumsData = state => photosStore(state).albums.data;
export const albumsStatus = state => photosStore(state).albums.status;
export const isFetchingAlbums = state => photosStore(state).albums.fetching;

export const albumData = state => photosStore(state).album.data;
export const albumSelection = state => photosStore(state).album.selection;
export const albumStatus = state => photosStore(state).album.status;
export const isFetchingAlbum = state => photosStore(state).album.fetching;
