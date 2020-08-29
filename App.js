import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import AddScreen from './src/screens/AddScreen'
import CommentsScreen from './src/screens/CommentsScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import UserScreen from './src/screens/UserScreen'
import ProfileScreen from './src/screens/ProfileScreen'


const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000000000,
    damping: 5000000000,
    mass: 0,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{headerShown: false, animationEnabled: true}} />
        <Stack.Screen name="Notifications" component={NotificationScreen} options = {{headerShown: false, animationEnabled: true}} />
        <Stack.Screen name="Add" component={AddScreen} options = {{headerShown: false}} />
        <Stack.Screen name="Comments" component={CommentsScreen} options = {{headerShown: false}} />
        <Stack.Screen name="User" component={UserScreen} options = {{headerShown: false}} />
        <Stack.Screen name="Profile" component={ProfileScreen} options = {{headerShown: false, gestureDirection: 'horizontal-inverted', transitionSpec: {open: config, close: config,},}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;