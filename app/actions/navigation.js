export const NAVIGATE = 'NAVIGATE_NAVIGATE';
export const BACK = 'NAVIGATE_BACK';
export const OPENDRAWER = 'NAVIGATE_OPENDRAWER';

export function navigate(scene, newSection = false) {
  return {
    type: NAVIGATE,
    payload: { scene, newSection },
  };
}

export function back() {
  return {
    type: BACK,
  };
}

export function updateDrawer(drawerState) {
  return {
    type: OPENDRAWER, payload: { drawerOpen: drawerState },
  };
}
