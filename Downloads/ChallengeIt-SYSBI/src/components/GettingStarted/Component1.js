import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {primaryColor} from '../colors';
import {Fonts} from '../../utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import Snackbar from 'react-native-snackbar';
import {Loading} from '../../components/Loading';

//redux
import {connect} from 'react-redux';
import {checkEmail} from '../../redux/actions/auth';

GoogleSignin.configure({
  webClientId:
    '878816843130-sd5e7fjars5k21398v54t9u9ogt96a4s.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

const Component1 = ({navigation, checkEmail, isSuccess, isLoading, errMsg}) => {
  const [canIMove, setCanIMove] = useState(false);
  const [results, setRes] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [fbLoading, setFbLoading] = useState(false);
  const [gLoading, setGLoading] = useState(false);

  const [from, setFrom] = useState('');

  const {height} = Dimensions.get('window');

  //Google sign
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const googlePromise = await GoogleSignin.signIn();
      const userInfo = (await GoogleSignin.getCurrentUser().then(googlePromise))
        .user;
      if (userInfo) {
        // console.log(userInfo);
        let email = userInfo.email;
        // setEmail(email);
        // setFrom('google');
        setGLoading(true);
        var formdata = new FormData();
        let from = 'google';
        formdata.append('email', email);
        formdata.append('loginwith', from);

        console.log(formdata);
        new Promise((rsl, rej) => {
          checkEmail(formdata, rsl, rej);
        })
          .then((res) => {
            setGLoading(false);
            console.log(res);
            if (res == 1) {
              navigation.navigate('Home');
            } else if (res == 2) {
              Snackbar.show({
                text: 'Email Already exist',
                duration: Snackbar.LENGTH_SHORT,
              });
            } else if (res == 3) {
              navigation.navigate('C2', {email, from});
            }
          })
          .catch((errorData) => {
            setGLoading(false);
            Alert.alert(JSON.string(errorData));
          });
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
        console.log(error);
      }
    }
  };

  //Facebook signin
  const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      // 'user_friends',
    ]);
    console.log('Login', result);
    // setRes(results);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    data && setFbLoading(true);
    // console.log('data', data);
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  };
  //apple signin
  const handleAppleSignin = async () => {
    return (appleAuthRequestResponse = await appleAuth
      .performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      .then((appleAuthRequestResponse) => {
        let {identifyToken, email} = appleAuthRequestResponse;
        console.log(identifyToken);
      }));
  };
  //handle Email
  const handleEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email === '') {
      Snackbar.show({
        text: 'Kindly Enter email address',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (!reg.test(email)) {
      Snackbar.show({
        text: 'Kindly Enter valid email',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('email', email);
      new Promise((rsl, rej) => {
        checkEmail(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          if (res == 1) {
            Snackbar.show({
              text: 'User Already exist,Kindly Signin',
              duration: Snackbar.LENGTH_SHORT,
            });
          } else if (res == 2) {
            Snackbar.show({
              text: 'Email Already exist.',
              duration: Snackbar.LENGTH_SHORT,
            });
          } else if (res == 3) {
            navigation.navigate('C2', {email, from});
          }
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
      style={{flex: 1, backgroundColor: 'red'}}
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'green'}}>
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
              Sign up
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              Enter your email address to create account
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="johndoe@gmail.com"
              // value={email}
              keyboardType={'email-address'}
              onChangeText={(email) => setEmail(email)}
            />
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
          <View
            style={[
              styles.paginationView,
              {backgroundColor: primaryColor, borderColor: primaryColor},
            ]}></View>
          <View style={styles.paginationView}></View>
          <View style={[styles.paginationView]}></View>
          <View style={styles.paginationView}></View>
          {/* <View style = {styles.paginationView}></View> */}
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          style={styles.nextButtonStyle}
          onPress={() => handleEmail()}>
          {loading ? (
            <ActivityIndicator animating color={primaryColor} size={25} />
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.CenturyBold,
                color: primaryColor,
              }}>
              Next
            </Text>
          )}
        </TouchableOpacity>

        <View style={{flex: 0.25, marginTop: height / 15}}>
          <View style={{flex: 1}}>
            <Text style={{fontFamily: Fonts.CenturyRegular}}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signin');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.CenturyBold,
                  color: primaryColor,
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={styles.socialIconsStyle}
              onPress={() =>
                onFacebookButtonPress().then((res) => {
                  let email = res.additionalUserInfo.profile.email;
                  let from = 'facebook';
                  var formdata = new FormData();
                  formdata.append('loginwith', from);
                  formdata.append('email', email);
                  new Promise((rsl, rej) => {
                    checkEmail(formdata, rsl, rej);
                  })
                    .then((res) => {
                      setFbLoading(false);
                      if (res == 1) {
                        navigation.navigate('Home');
                      } else if (res == 2) {
                        Snackbar.show({
                          text: 'Email Already exist',
                          duration: Snackbar.LENGTH_SHORT,
                        });
                      } else if (res == 3) {
                        navigation.navigate('C2', {email, from});
                      }
                    })
                    .catch((errorData) => {
                      setFbLoading(false);
                      Snackbar.show({
                        text: errorData,
                        duration: Snackbar.LENGTH_SHORT,
                      });
                    });
                })
              }>
              {fbLoading ? (
                <ActivityIndicator animating color={primaryColor} size={25} />
              ) : (
                <EvilIcons
                  name="sc-facebook"
                  style={{fontSize: 40, color: '#80aaff'}}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialIconsStyle}
              onPress={() => {
                signIn();
              }}>
              {gLoading ? (
                <ActivityIndicator animating color={primaryColor} size={25} />
              ) : (
                <Image
                  source={require('../../assets/images/google.png')}
                  style={{height: 30, width: 30}}
                />
              )}
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.socialIconsStyle}
              onPress={() => {
                handleAppleSignin();
              }}>
              <Image
                source={require('../../assets/images/apple.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {checkEmail})(Component1);
