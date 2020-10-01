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
import {primaryColor} from '../../components/colors';
import {Fonts} from '../../utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Snackbar from 'react-native-snackbar';
import styles from './styles';
//redux
import {connect} from 'react-redux';
import {changePass} from '../../redux/actions/auth';

const ResetPassword = ({navigation, changePass, route}) => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [cnfPass, setCnf] = useState('');
  const {height} = Dimensions.get('window');

  const resetPassword = () => {
    const {otp, email} = route.params;
    if (password === '') {
      Snackbar.show({
        text: 'Kindly Enter new password',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (cnfPass === '') {
      Snackbar.show({
        text: 'Kindly confirm password',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else if (password !== cnfPass) {
      Snackbar.show({
        text: 'Passwords did not match',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', password);
      formdata.append('otp', otp);

      new Promise((rsl, rej) => {
        changePass(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          navigation.navigate('Signin');
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
              Update Password
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              Kindly enter a new password
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Password"
              value={password}
              keyboardType={'default'}
              onChangeText={(pass) => setPassword(pass)}
            />
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Confirm Password"
              value={cnfPass}
              secureTextEntry
              keyboardType={'default'}
              onChangeText={(password) => setCnf(password)}
            />
          </View>
        </View>
        <View style={{flex: 0.25, marginTop: height / 15}}></View>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          style={styles.nextButtonStyle}
          onPress={() => resetPassword()}>
          {loading ? (
            <ActivityIndicator animating color={primaryColor} size={25} />
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.CenturyBold,
                color: primaryColor,
              }}>
              Update
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {changePass})(ResetPassword);
