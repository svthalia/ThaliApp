import { NavigationContainer, DrawerActions, CommonActions } from '@react-navigation/native';
import { React } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../../screens/login/LoginScreenConnector';
import Welcome from '../../screens/welcome/WelcomeScreenConnector';
import Event from '../../screens/events/EventScreenConnector';
import Calendar from '../../screens/events/CalendarScreenConnector';
import Profile from '../../screens/profile/ProfileScreenConnector';
import Pizza from '../../screens/pizza/PizzaScreenConnector';
import Registration from '../../screens/events/RegistrationScreenConnector';
import MemberList from '../../screens/memberList/MemberListScreenConnector';
import Photos from '../../screens/photos/AlbumsOverviewScreenConnector';
import PhotoAlbum from '../../screens/photos/AlbumDetailScreenConnector';
import PhotoGallery from '../../screens/photos/AlbumGalleryScreenConnector';
import SplashScreen from '../../screens/splash/SplashScreen';
import Settings from '../../screens/settings/SettingsScreenConnector';
import EventAdmin from '../../screens/events/EventAdminScreenConnector';
import PizzaAdmin from '../../screens/pizza/PizzaAdminScreenConnector';
import Sidebar from '../sidebar/SidebarConnector';

const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Welcome"
      contentComponent={Sidebar}
    >
      <Drawer.Screen
        name="Welcome"
        component={Welcome}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
      />
      <Drawer.Screen
        name="MemberList"
        component={MemberList}
      />
      <Drawer.Screen
        name="Photos"
        component={Photos}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
      />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

function SignedInNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerMode: 'none' }}
    >
      <Stack.Screen
        name="MainNavigator"
        component={MainNavigator}
      />
      <Stack.Screen
        name="Event"
        component={Event}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        name="Pizza"
        component={Pizza}
      />
      <Stack.Screen
        name="PhotoAlbum"
        component={PhotoAlbum}
      />
      <Stack.Screen
        name="PhotoGallery"
        component={PhotoGallery}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
      />
      <Stack.Screen
        name="EventAdmin"
        component={EventAdmin}
      />
      <Stack.Screen
        name="PizzaAdmin"
        component={PizzaAdmin}
      />
    </Stack.Navigator>
  );
}

function AppNavigator() {
  if (state.status == )
  <Stack.Navigator>
    {

    }
  </Stack.Navigator>
}
  Splash: SplashScreen,
  Auth: Login,
  SignedIn: SignedInNavigator,
});

const AppContainer = `<NavigationContainer>${{ AppNavigator }}</NavigationContainer>`;

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(name, params) {
  navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function goBack() {
  navigator.dispatch(
    CommonActions.goBack(),
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
