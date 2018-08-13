import {
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  NavigationActions,
  DrawerActions,
} from 'react-navigation';

import Login from './ui/screens/user/Login';
import Welcome from './ui/screens/welcome/Welcome';
import Event from './ui/screens/events/Event';
import Calendar from './ui/screens/events/Calendar';
import Profile from './ui/screens/user/Profile';
import Pizza from './ui/screens/pizza/Pizza';
import Registration from './ui/screens/events/Registration';
import MemberList from './ui/screens/memberList/MemberList';
import SplashScreen from './ui/screens/splash/SplashScreen';
import Settings from './ui/screens/settings/Settings';
import Sidebar from './ui/components/sidebar/Sidebar';

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
