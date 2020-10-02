import React, {useEffect, useState} from 'react';
import {View, LogBox, PermissionsAndroid} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {Response} from './src/screens/Post';
import Challenge from './src/screens/Post/Challenge';
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
// import
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
import Geolocation from 'react-native-geolocation-service';
import BackgroundTimer from 'react-native-background-timer';
import {AskPermission} from './src/components/AskPermission';

//redux
import {connect} from 'react-redux';
import {getLocation} from './src/redux/actions/app';
const Stack = createStackNavigator();

function AppNav({user, isLoggedIn, getLocation, token}) {
  let initial = isLoggedIn && isLoggedIn ? 'Home' : 'Signin';
  console.log(isLoggedIn);
  useEffect(() => {
    let permission = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
    if (Platform.OS === 'android') AskPermission(permission);
    getWorkerLocation();

    const intervalId = BackgroundTimer.setInterval(() => {
      getWorkerLocation();
    }, 3600000);
    return () => clearInterval(intervalId);
  }, []);

  const getWorkerLocation = () => {
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          let {latitude, longitude} = position.coords;
          await AsyncStorage.setItem('lat', JSON.stringify(latitude));
          await AsyncStorage.setItem('long', JSON.stringify(longitude));
          if (latitude && longitude) {
            const params = new FormData();
            params.append('lati', JSON.parse(latitude));
            params.append('longi', JSON.parse(longitude));

            console.log(params);
            new Promise((rsl, rej) => {
              token && getLocation(params, token, rsl, rej);
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
          }
        },
        (error) => {
          console.log(error);
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initial}>
        {!isLoggedIn && (
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
              animationEnabled: true,
            }}
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
  const {user, isLoggedIn, token} = state.auth;
  return {
    user,
    isLoggedIn,
    token,
  };
};
export default connect(mapStateToProps, {getLocation})(AppNav);
