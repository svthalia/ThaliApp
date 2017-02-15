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
