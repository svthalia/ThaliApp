import { createStackNavigator, createSwitchNavigator, NavigationActions, } from 'react-navigation';

import Login from './ui/screens/user/Login';
import Welcome from './ui/screens/welcome/Welcome';
import Event from './ui/screens/events/Event';
import Profile from './ui/screens/user/Profile';
import Pizza from './ui/screens/pizza/Pizza';
import Registration from './ui/screens/events/Registration';
import SplashScreen from './ui/screens/splash/SplashScreen';

const SignedInNavigator = createStackNavigator({
  Welcome,
  Event,
  Profile,
  Pizza,
  Registration,
}, {
  initialRouteName: 'MainNavigator',
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

export default {
  AppNavigator,
  navigate,
  setTopLevelNavigator,
};
