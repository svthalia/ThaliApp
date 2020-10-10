import {
  createSwitchNavigator,
  createAppContainer,
  NavigationActions,
} from 'react-navigation';

import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './ui/screens/login/LoginScreenConnector';
import Welcome from './ui/screens/welcome/WelcomeScreenConnector';
import Event from './ui/screens/events/EventScreenConnector';
import Calendar from './ui/screens/events/CalendarScreenConnector';
import Profile from './ui/screens/profile/ProfileScreenConnector';
import Pizza from './ui/screens/pizza/PizzaScreenConnector';
import Registration from './ui/screens/events/RegistrationScreenConnector';
import MemberList from './ui/screens/memberList/MemberListScreenConnector';
import Photos from './ui/screens/photos/AlbumsOverviewScreenConnector';
import PhotoAlbum from './ui/screens/photos/AlbumDetailScreenConnector';
import PhotoGallery from './ui/screens/photos/AlbumGalleryScreenConnector';
import SplashScreen from './ui/screens/splash/SplashScreen';
import Settings from './ui/screens/settings/SettingsScreenConnector';
import EventAdmin from './ui/screens/events/EventAdminScreenConnector';
import PizzaAdmin from './ui/screens/pizza/PizzaAdminScreenConnector';
import Sidebar from './ui/components/sidebar/SidebarConnector';

const MainNavigator = createDrawerNavigator({
  Welcome,
  Calendar,
  MemberList,
  Photos,
  Settings,
}, {
  contentComponent: Sidebar,
});

const SignedInNavigator = createStackNavigator({
  MainNavigator,
  Event,
  Profile,
  Pizza,
  PhotoAlbum,
  PhotoGallery,
  Registration,
  EventAdmin,
  PizzaAdmin,
}, {
  headerMode: 'none',
});

const AppNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: Login,
  SignedIn: SignedInNavigator,
});

const AppContainer = createAppContainer(AppNavigator);

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack() {
  navigator.dispatch(
    NavigationActions.back(),
  );
}

function toggleDrawer() {
  navigator.dispatch(
    DrawerActions.toggleDrawer(),
  );
}

export default {
  AppContainer,
  navigate,
  goBack,
  toggleDrawer,
  setTopLevelNavigator,
};
