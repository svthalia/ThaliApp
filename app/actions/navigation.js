import * as types from './actionTypes';

export function navigate(scene) {
  return {
    type: types.NAVIGATE,
    scene,
  };
}

export function back() {
  return {
    type: types.BACK,
  };
}

export function updateDrawer(drawerState) {
  return {
    type: types.OPENDRAWER,
    drawerOpen: drawerState,
  };
}
