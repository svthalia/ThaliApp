export const BACK = 'NAVIGATE_BACK';
export const TOGGLE_DRAWER = 'NAVIGATE_TOGGLE_DRAWER';
export const OPEN_WEBSITE = 'NAVIGATE_OPEN_WEBSITE';

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

export function openWebsite(url) {
  return {
    type: OPEN_WEBSITE,
    payload: url,
  };
}
