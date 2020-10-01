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
import {otpVerify} from '../../redux/actions/auth';

const OTP = ({navigation, route, otpVerify}) => {
  const [loading, setLoading] = useState(false);
  const {email} = route.params;

  const [otp, setOTP] = useState('');
  const {height} = Dimensions.get('window');

  const verifyOTP = () => {
    if (otp === '') {
      Snackbar.show({
        text: `Enter opt sent at ${email}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('otp', otp);
      formdata.append('email', email);

      new Promise((rsl, rej) => {
        otpVerify(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          navigation.navigate('Reset', {email, otp});
        })
        .catch((errorData) => {
          setLoading(false);
          Snackbar.show({
            text: errorData,
            duration: Snackbar.LENGTH_SHORT,
          });
          // navigation.navigate(
          //   // errorData === 'No Record exit.' ? 'Signup' : 'Signin',
          // );
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
              Verify OTP
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              Enter the otp which have sent to your email:
              <Text
                style={{color: primaryColor, fontFamily: Fonts.CenturyRegular}}>
                {email}
              </Text>
            </Text>
          </View>
          <View>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter OTP"
              value={otp}
              keyboardType={'number-pad'}
              onChangeText={(otp) => setOTP(otp)}
            />
          </View>
        </View>
        <View style={{flex: 0.25, marginTop: height / 15}}></View>

        <TouchableOpacity
          activeOpacity={0.7}
          disabled={loading}
          style={styles.nextButtonStyle}
          onPress={() => verifyOTP()}>
          {loading ? (
            <ActivityIndicator animating color={primaryColor} size={25} />
          ) : (
            <Text
              style={{
                fontSize: 20,
                fontFamily: Fonts.CenturyBold,
                color: primaryColor,
              }}>
              Verify
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {otpVerify})(OTP);
