import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import PropTypes from 'prop-types';
import { navigationRef } from './RootNavigation';
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
import Settings from '../../screens/settings/SettingsScreenConnector';
import EventAdmin from '../../screens/events/EventAdminScreenConnector';
import PizzaAdmin from '../../screens/pizza/PizzaAdminScreenConnector';
import Sidebar from '../sidebar/SidebarConnector';

const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName='Welcome'
      drawerContent={(s) => {
        return <Sidebar activeItemKey={s.state.routeNames[s.state.index]} />;
      }}
    >
      <Drawer.Screen name='Welcome' component={Welcome} />
      <Drawer.Screen name='Calendar' component={Calendar} />
      <Drawer.Screen name='MemberList' component={MemberList} />
      <Drawer.Screen name='Photos' component={Photos} />
      <Drawer.Screen name='Settings' component={Settings} />
    </Drawer.Navigator>
  );
}

const Stack = createStackNavigator();

function SignedInNavigator() {
  return (
    <Stack.Navigator
      initialRouteName='MainNavigator'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='MainNavigator' component={MainNavigator} />
      <Stack.Screen name='Event' component={Event} />
      <Stack.Screen name='Profile' component={Profile} />
      <Stack.Screen name='Pizza' component={Pizza} />
      <Stack.Screen name='PhotoAlbum' component={PhotoAlbum} />
      <Stack.Screen name='PhotoGallery' component={PhotoGallery} />
      <Stack.Screen name='Registration' component={Registration} />
      <Stack.Screen name='EventAdmin' component={EventAdmin} />
      <Stack.Screen name='PizzaAdmin' component={PizzaAdmin} />
    </Stack.Navigator>
  );
}

const Navigation = (props) => {
  return (
    <NavigationContainer ref={navigationRef}>
      {props.loggedIn ? (
        <>
          <SignedInNavigator />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </NavigationContainer>
  );
};

Navigation.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
