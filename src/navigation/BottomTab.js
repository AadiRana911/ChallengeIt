import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import cstyles from '../components/cstyles';
import {createStackNavigator} from '@react-navigation/stack';
import Camera from '../screens/Camera';

import Chat from '../screens/Chat';
import NotificationScreen from '../screens/NotificationScreen';
import Feed from '../screens/Feed';
import Challenges from '../screens/Challenges';
import {primaryColor} from '../components/colors';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
//Home Stack
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Feed}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
//Challenges Stack
const ChallengeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Challenges"
        component={Challenges}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
//Camera Stack
const CameraStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
//Chat Stack
const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
//Notif Stack
const NotificationStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Chat"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const INITIAL_ROUTE_NAME = 'Home';

function BottomTabNavigator({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      activeColor={primaryColor}
      inactiveColor="white"
      backBehavior="initialRoute"
      labeled={false}
      tabBarOptions={{
        activeTintColor: primaryColor,
      }}
      barStyle={{backgroundColor: '#2f2f2f', padding: 10}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="fire" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Challenges"
        component={ChallengeStack}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialIcons name="slideshow" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Camera"
        component={CameraStack}
        options={{
          tabBarLabel: 'Camera',
          tabBarIcon: ({color}) => (
            <Entypo name="picasa" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        children={ChatStack}
        options={{
          tabBarIcon: ({color}) => (
            <Feather name="message-square" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons
              name="ios-notifications-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
