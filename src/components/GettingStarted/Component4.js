import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import {primaryColor} from '../colors';
import AsyncStorage from '@react-native-community/async-storage';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//redux
import {connect} from 'react-redux';
import {registerUser} from '../../redux/actions/auth';
//fcm
import {fcmService} from '../../Notifications/FCMService';
import {localNotificationService} from '../../Notifications/LocalNotificationService';

const Component4 = ({navigation, route, registerUser}) => {
  const [image, setImage] = useState('');
  const {height} = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('ChallengeIt onRegister: ', token);
      setToken(token);
    }

    function onNotification(notify) {
      console.log('ChallengeIt onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('ChallengeIt onOpenNotification: ', notify);
      alert('ChallengeIt: ' + notify.body);
    }

    return () => {
      console.log('ChallengeIT unRegister');
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  const pickImage = () => {
    ImagePicker.openPicker({mediaType: 'photo'}).then((image) => {
      setImage(image.path);
    });
  };

  const handleRegister = async () => {
    const {uname, email, gender, fname, lname, password, from} = route.params;

    if (image === '') {
      Snackbar.show({
        text: 'Kindly choose profile picture',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      const time = new Date();
      setLoading(true);
      let lat = await AsyncStorage.getItem('lat');
      let long = await AsyncStorage.getItem('long');
      console.log('From Signup', parseFloat(lat), parseFloat(long));
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('username', uname);
      formdata.append('fname', fname);
      formdata.append('lname', lname);
      formdata.append('gender', gender);
      token && formdata.append('token', token);
      formdata.append('pass', password);
      lat && formdata.append('lati', parseFloat(lat));
      long && formdata.append('longi', parseFloat(long));
      formdata.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'image_' + Math.floor(time.getTime() + time.getSeconds() / 2),
      });
      // return console.log(formdata);
      console.log(formdata);
      new Promise((rsl, rej) => {
        registerUser(formdata, rsl, rej);
      })
        .then((res) => {
          Snackbar.show({
            text: res,
            duration: Snackbar.LENGTH_SHORT,
          });
          navigation.navigate('Signin');
          setLoading(false);
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'green'}}>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.25,
            // justifyContent: 'space-between',
            marginBottom: 40,
          }}>
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 25,
                color: primaryColor,
                fontFamily: Fonts.CenturyBold,
              }}>
              Sign up
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              tap to upload your profile picture
            </Text>
          </View>

          <View
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 10, height: 10},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 10,
              borderRadius: 70,
              borderWidth: 3,
              borderColor: '#fff',
              alignSelf: 'center',
            }}>
            {image === '' ? (
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() => {
                  pickImage();
                }}>
                <Image
                  source={{
                    uri:
                      'https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255626-stock-illustration-avatar-male-profile-gray-person.jpg ',
                  }}
                  style={[styles.imageStyle, {borderColor: 'white'}]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.imageStyle}
                onPress={() => {
                  pickImage();
                }}>
                <Image
                  source={{uri: image}}
                  style={[styles.imageStyle, {borderColor: 'white'}]}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 3,
                color: primaryColor,
                right: -4,
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 4,
                height: 20,
                width: 20,
                justifyContent: 'center',
                alignItems: 'center',
                elevation: 2,
              }}
              onPress={() => {
                pickImage();
              }}>
              <MaterialCommunityIcons
                name="pencil"
                style={{
                  alignSelf: 'center',
                  fontSize: 14,
                  color: 'black',

                  color: primaryColor,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            alignSelf: 'center',
            width: '30%',
            height: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
          }}>
          <View style={[styles.paginationView]}></View>
          {/* <View style={styles.paginationView}></View> */}
          <View style={styles.paginationView}></View>
          <View style={styles.paginationView}></View>
          <View
            style={[
              styles.paginationView,
              {backgroundColor: primaryColor, borderColor: primaryColor},
            ]}></View>
        </View>
        <TouchableOpacity
          disabled={loading}
          style={styles.nextButtonStyle}
          onPress={() => handleRegister()}>
          {loading ? (
            <ActivityIndicator animating color={primaryColor} size={25} />
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.CenturyBold,
                color: primaryColor,
              }}>
              Register
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {registerUser})(Component4);
