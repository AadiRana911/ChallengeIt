import React from 'react';
import {View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen'
import AddScreen from './src/screens/AddScreen'
import CommentsScreen from './src/screens/CommentsScreen'
import NotificationScreen from './src/screens/NotificationScreen'
import UserScreen from './src/screens/UserScreen'



const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options = {{headerShown: false}} />
        <Stack.Screen name="Notifications" component={NotificationScreen} options = {{headerShown: false}} />
        <Stack.Screen name="Add" component={AddScreen} options = {{headerShown: false}} />
        <Stack.Screen name="Comments" component={CommentsScreen} options = {{headerShown: false}} />
        <Stack.Screen name="User" component={UserScreen} options = {{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;