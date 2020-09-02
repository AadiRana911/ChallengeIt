import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Camera from './src/screens/Camera';

import HomeScreen from './src/screens/HomeScreen';
import AddScreen from './src/screens/AddScreen';
import Chat from './src/screens/Chat';
import NotificationScreen from './src/screens/NotificationScreen';
import UserScreen from './src/screens/UserScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Challenges from './src/screens/Challenges';
import Feed from './src/screens/Feed';
import User from './src/screens/User';

const Stack = createStackNavigator();
console.disableYellowBox = true;
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Feed}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Challenges"
          component={Challenges}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="User"
          component={User}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
