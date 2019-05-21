import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
  DrawerActions,
} from 'react-navigation';

import Login from './ui/screens/login/LoginScreenConnector';
import Welcome from './ui/screens/welcome/WelcomeScreenConnector';
import Event from './ui/screens/events/EventScreenConnector';
import Calendar from './ui/screens/events/CalendarScreenConnector';
import Profile from './ui/screens/profile/ProfileScreenConnector';
import Pizza from './ui/screens/pizza/PizzaScreenConnector';
import Registration from './ui/screens/events/RegistrationScreenConnector';
import MemberList from './ui/screens/memberList/MemberListScreenConnector';
import SplashScreen from './ui/screens/splash/SplashScreen';
import Settings from './ui/screens/settings/SettingsScreenConnector';
import EventAdmin from './ui/screens/events/EventAdminScreenConnector';
import Sidebar from './ui/components/sidebar/SidebarConnector';

const MainNavigator = createDrawerNavigator({
  Welcome,
  Calendar,
  MemberList,
  Settings,
}, {
  contentComponent: Sidebar,
});

const SignedInNavigator = createStackNavigator({
  MainNavigator,
  Event,
  Profile,
  Pizza,
  Registration,
  EventAdmin,
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
