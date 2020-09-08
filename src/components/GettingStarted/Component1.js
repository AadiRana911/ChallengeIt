import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {primaryColor} from '../colors';
import {Fonts} from '../../utils/Fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const Component1 = ({navigation}) => {
  const [canIMove, setCanIMove] = useState(false);
  const {height} = Dimensions.get('window');

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
              style={{fontSize: 25, color: primaryColor, fontFamily: Fonts.CenturyBold}}>
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
          style={styles.nextButtonStyle}
          onPress={() => navigation.navigate('C2')}>
          <Text style={{fontSize: 20, fontFamily: Fonts.CenturyBold, color: primaryColor}}>
            Next
          </Text>
        </TouchableOpacity>
        <View style={{flex: 0.25, marginTop: height / 15}}>
          <View style={{flex: 1}}>
            <Text style = {{fontFamily: Fonts.CenturyRegular}}>Already have an account?</Text>
            <TouchableOpacity>
              <Text
                style={{fontSize: 16, fontFamily: Fonts.CenturyBold, color: primaryColor}}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.socialIconsStyle}>
              <EvilIcons
                name="sc-facebook"
                style={{fontSize: 40, color: '#80aaff'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconsStyle}>
              <Image
                source={require('../../assets/images/google.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
export {Component1};
