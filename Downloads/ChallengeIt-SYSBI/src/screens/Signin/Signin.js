import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {primaryColor} from '../../components/colors';
import {Fonts} from '../../utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import styles from './styles';
//redux
import {connect} from 'react-redux';
import {login} from '../../redux/actions/auth';
//fcm
import {fcmService} from '../../Notifications/FCMService';
import {localNotificationService} from '../../Notifications/LocalNotificationService';

const Signin = ({navigation, login}) => {
  const [canIMove, setCanIMove] = useState(false);
  const [results, setRes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {height} = Dimensions.get('window');
  const [token, setToken] = useState('');

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister);
    function onRegister(token) {
      console.log('ChallengeIt onRegister: ', token);
      setToken(token);
    }
    return () => {
      fcmService.unRegister();
    };
  }, []);

  const handleLogin = async () => {
    if (email === '') {
      Snackbar.show({
        text: 'Kindly Enter email address',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password === '') {
      Snackbar.show({
        text: 'Kindly Enter password',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      let lat = await AsyncStorage.getItem('lat');
      let long = await AsyncStorage.getItem('long');
      console.log('From Sign', parseFloat(lat), parseFloat(long));

      let formdata = new FormData();
      formdata.append('email', email);
      formdata.append('pass', password);
      lat && formdata.append('lati', JSON.parse(lat));
      long && formdata.append('longi', JSON.parse(long));
      token && formdata.append('token', token);
      // const formdata = {
      //   useremail: email,
      //   userpass: password,
      // };

      console.log(formdata);
      new Promise((rsl, rej) => {
        login(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          navigation.navigate('Root');
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
      style={{flex: 1}}
      contentContainerStyle={{flexGrow: 1, flex: 1}}>
      <View style={styles.container}>
        <View
          style={{
            flex: 0.25,
            justifyContent: 'space-between',
            marginBottom: 40,
          }}>
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 25,
                color: primaryColor,
                fontFamily: Fonts.CenturyBold,
              }}>
              Sign In
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              Enter your email address and password to login
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Email"
              value={email}
              keyboardType={'email-address'}
              onChangeText={(email) => setEmail(email)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Password"
              value={password}
              secureTextEntry
              keyboardType={'default'}
              onChangeText={(password) => setPassword(password)}
            />
          </View>
        </View>

        <View style={{flex: 0.25, marginTop: height / 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: Fonts.CenturyRegular}}>
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('C1');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.CenturyBold,
                  color: primaryColor,
                }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          style={styles.nextButtonStyle}
          onPress={() => handleLogin()}>
          {loading ? (
            <ActivityIndicator animating color={primaryColor} size={25} />
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.CenturyBold,
                color: primaryColor,
              }}>
              Login
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          onPress={() => {
            navigation.navigate('VerifyEmail');
          }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.CenturyBold,
              color: primaryColor,
            }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {login})(Signin);
