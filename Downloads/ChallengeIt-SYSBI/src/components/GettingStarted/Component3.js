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
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
//redux
import {connect} from 'react-redux';
import {checkUsername} from '../../redux/actions/auth';

const Component3 = ({
  navigation,
  route,
  checkUsername,
  isSuccess,
  isLoading,
}) => {
  const [canIMove, setCanIMove] = useState(false);
  const {height} = Dimensions.get('window');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [uname, setUname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleuser = () => {
    const {email, gender, from} = route.params;
    if (fname === '') {
      Snackbar.show({
        text: 'Kindly Enter First Name',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (lname === '') {
      Snackbar.show({
        text: 'Kindly Enter Last Name',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (uname === '') {
      Snackbar.show({
        text: 'Kindly Enter Username',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password === '') {
      Snackbar.show({
        text: 'Kindly Enter Password',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('username', uname);
      new Promise((rsl, rej) => {
        checkUsername(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          navigation.navigate('C4', {
            uname,
            email,
            gender,
            fname,
            lname,
            password,
            from,
          });
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
      style={{backgroundColor: '#F7F9FC'}}
      enableAutomaticScroll
      contentContainerStyle={{
        flexGrow: 1,
      }}>
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
              placeholder="First Name"
              value={fname}
              onChangeText={(e) => {
                setFname(e);
              }}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Last Name"
              value={lname}
              onChangeText={(e) => {
                setLname(e);
              }}
            />
            <TextInput
              style={[styles.textInputStyle]}
              placeholder="User Name"
              value={uname}
              onChangeText={(e) => {
                setUname(e);
              }}
            />
            <View>
              <TextInput
                style={[styles.textInputStyle]}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(e) => {
                  setPassword(e);
                }}
              />

              {/* <Text style={{color: primaryColor, fontFamily: Fonts.CenturyRegular}}>
                This username is taken try another
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '50%',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <Text style = {{fontFamily: Fonts.CenturyRegular}}>try</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.suggestions}>ali031</Text>
                  <Text style={styles.suggestions}>ali169</Text>
                  <Text style={styles.suggestions}>ali003</Text>
                </View>
              </View> */}
            </View>
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
          <View style={styles.paginationView}></View>
          <View
            style={[
              styles.paginationView,
              {backgroundColor: primaryColor, borderColor: primaryColor},
            ]}></View>
          <View style={styles.paginationView}></View>
          {/* <View style={styles.paginationView}></View> */}
        </View>
        <TouchableOpacity
          style={styles.nextButtonStyle}
          onPress={() => handleuser()}>
          {loading ? (
            <ActivityIndicator animating size={25} color={primaryColor} />
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
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {checkUsername})(Component3);
