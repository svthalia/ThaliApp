import * as React from 'react';
import { DrawerActions } from '@react-navigation/routers';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current.navigate(name, params);
}

export function goBack() {
  navigationRef.current.goBack();
}

export function toggleDrawer() {
  navigationRef.current.dispatch(DrawerActions.toggleDrawer());
}
