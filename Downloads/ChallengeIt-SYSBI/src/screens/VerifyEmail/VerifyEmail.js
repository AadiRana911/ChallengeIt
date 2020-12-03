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
import {getOtp} from '../../redux/actions/auth';

const VerifyEmail = ({navigation, getOtp}) => {
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const {height} = Dimensions.get('window');

  const handleEmail = () => {
    if (email === '') {
      Snackbar.show({
        text: 'Kindly Enter email address',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      setLoading(true);
      var formdata = new FormData();
      formdata.append('email', email);

      new Promise((rsl, rej) => {
        getOtp(formdata, rsl, rej);
      })
        .then((res) => {
          setLoading(false);
          navigation.navigate('OTP', {email});
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
              Enter your registered email
            </Text>
            <Text style={{fontSize: 15, fontFamily: Fonts.CenturyRegular}}>
              Kindly enter your email which is registered in our database
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
        </View>
        <View style={{flex: 0.25, marginTop: height / 15}}></View>

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
              Generate OTP
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default connect(null, {getOtp})(VerifyEmail);
