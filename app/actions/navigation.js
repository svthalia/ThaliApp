export const BACK = 'NAVIGATE_BACK';
export const TOGGLE_DRAWER = 'NAVIGATE_TOGGLE_DRAWER';

export function goBack() {
  return {
    type: BACK,
  };
}

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}
