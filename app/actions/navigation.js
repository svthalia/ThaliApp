import * as types from './actionTypes';

export function navigate(scene, newSection = false) {
  return {
    type: types.NAVIGATE,
    scene,
    newSection,
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
