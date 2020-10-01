import React, {useEffect} from 'react';
import {View, LogBox} from 'react-native';
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
import Hashtag from './src/screens/Hashtag';
import Settings from './src/screens/Settings';
import Playlists from './src/screens/Playlists';
import ProfileScreen from './src/screens/ProfileScreen';
import VerifyEmail from './src/screens/VerifyEmail';
// import {
//   Component1,
//   Component2,
//   Component3,
//   Component4,
// } from './src/components/GettingStarted';
import Component1 from './src/components/GettingStarted/Component1';
import Component2 from './src/components/GettingStarted/Component2';

import Component3 from './src/components/GettingStarted/Component3';
import Component4 from './src/components/GettingStarted/Component4';

import Responses from './src/screens/Response';
import Preview from './src/screens/Preview';
import Conversation from './src/screens/Conversation';
import PlaylistDetail from './src/screens/Playlists/PlaylistDetail';
import Interests from './src/screens/ChooseInterest';
import BottomTab from './src/navigation/BottomTab';
import Signin from './src/screens/Signin';
import OTP from './src/screens/otp';
import ResetPassword from './src/screens/ResetPassword';
//redux
import {connect} from 'react-redux';
const Stack = createStackNavigator();

function AppNav({user, isLoggedIn}) {
  const initial = isLoggedIn ? 'Home' : 'Signin';
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        {!isLoggedIn && (
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="Signin"
            component={Signin}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="OTP"
            component={OTP}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="VerifyEmail"
            component={VerifyEmail}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="Reset"
            component={ResetPassword}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="C1"
            component={Component1}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="C2"
            component={Component2}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="C3"
            component={Component3}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {!isLoggedIn && (
          <Stack.Screen
            name="C4"
            component={Component4}
            options={{headerShown: false, animationEnabled: true}}
          />
        )}
        {/* <Stack.Screen
          name="Home"
          component={Feed}
          options={{headerShown: false, animationEnabled: true}}
        /> */}
        <Stack.Screen
          name="Responses"
          component={Responses}
          options={{headerShown: false, animationEnabled: true}}
        />
        <Stack.Screen
          name="Hashtag"
          component={Hashtag}
          options={{headerShown: false, animationEnabled: true}}
        />
        {/* <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
          options={{headerShown: false, animationEnabled: true}}
        /> */}
        <Stack.Screen
          name="Add"
          component={AddScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="Challenges"
          component={Challenges}
          options={{headerShown: false}}
        /> */}
        {/* <Stack.Screen
          name="Camera"
          component={Camera}
          options={{headerShown: false}}
        /> */}
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
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Playlists"
          component={Playlists}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlaylistDetail"
          component={PlaylistDetail}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Interests"
          component={Interests}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" options={{headerShown: false}}>
          {(props) => <BottomTab {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  const {user, isLoggedIn} = state.auth;
  return {
    user,
    isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppNav);
