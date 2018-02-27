import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
  DrawerActions,
} from 'react-navigation';

import Login from './ui/screens/login/LoginScreenContainer';
import Welcome from './ui/screens/welcome/WelcomeScreenContainer';
import Event from './ui/screens/events/EventScreenContainer';
import Calendar from './ui/screens/events/CalendarScreenContainer';
import Profile from './ui/screens/profile/ProfileScreenContainer';
import Pizza from './ui/screens/pizza/PizzaScreenContainer';
import Photos from './ui/screens/photos/AlbumsOverviewScreenContainer';
import PhotoAlbum from './ui/screens/photos/AlbumDetailScreenContainer';
import Registration from './ui/screens/events/RegistrationScreenContainer';
import MemberList from './ui/screens/memberList/MemberListScreenContainer';
import SplashScreen from './ui/screens/splash/SplashScreen';
import Settings from './ui/screens/settings/SettingsScreenContainer';
import Sidebar from './ui/components/sidebar/SidebarContainer';

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
  Registration,
}, {
  headerMode: 'none',
});

const AppNavigator = createSwitchNavigator({
  Splash: SplashScreen,
  Auth: Login,
  SignedIn: SignedInNavigator,
});

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
  AppNavigator,
  navigate,
  goBack,
  toggleDrawer,
  setTopLevelNavigator,
};
