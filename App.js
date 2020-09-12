import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Camera from './src/screens/Camera';

import {Challenge, Response} from './src/screens/Post';
import AddScreen from './src/screens/AddScreen';
import Chat from './src/screens/Chat';
import NotificationScreen from './src/screens/NotificationScreen';
import UserScreen from './src/screens/UserScreen';
import Challenges from './src/screens/Challenges';
import Feed from './src/screens/Feed';
import User from './src/screens/User';
import SignupScreen from './src/screens/SignupScreen';
import ViewResponses from './src/screens/ViewResponses';
import {
  Component1,
  Component2,
  Component3,
  Component4,
} from './src/components/GettingStarted';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persister, store} from './src/redux/store';
const Stack = createStackNavigator();
console.disableYellowBox = true;

function AppNav() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Signup">

        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="C1"
          component={Component1}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="C2"
          component={Component2}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="C3"
          component={Component3}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="C4"
          component={Component4}
          options={{headerShown: false, animationEnabled: true}}
        />
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
        <Stack.Screen
          name="Challenge"
          component={Challenge}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Response"
          component={Response}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ViewRes"
          component={ViewResponses}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ReduxApp = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <AppNav />
      </PersistGate>
    </Provider>
  );
};

export default ReduxApp;
