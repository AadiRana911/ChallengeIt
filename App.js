import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen'
import AddScreen from './src/screens/AddScreen'
import CommentsScreen from './src/screens/CommentsScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import UserScreen from './src/screens/UserScreen'

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator barStyle={{backgroundColor: 'transparent'}}>
        <Tab.Screen name = "Home" component = {HomeScreen}></Tab.Screen>
        <Tab.Screen name = "Notifications" component = {NotificationScreen}></Tab.Screen>
        <Tab.Screen name = "Add" component = {AddScreen}></Tab.Screen>
        <Tab.Screen name = "Comments" component = {CommentsScreen}></Tab.Screen>
        <Tab.Screen name = "User" component = {UserScreen}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;