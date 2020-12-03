import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Header} from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';

import ToggleSwitch from 'toggle-switch-react-native';

const Settings = ({navigation, route}) => {
  const [isOn, setIsOn] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [cnfPass, setCnfPass] = useState('');
  const [changingEmail, setChanginEmail] = useState(false);
  const [changingPass, setChangingPass] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor="white"
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={25}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={
          <Text
            style={{
              fontFamily: Fonts.CenturyBold,
              fontSize: 15,
              color: primaryColor,
            }}>
            Settings
          </Text>
        }
        containerStyle={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
          margin: 10,
        }}>
        <Text
          style={{
            fontFamily: Fonts.CenturyBold,
            fontSize: 15,
          }}>
          Account Privacy
        </Text>
        <ToggleSwitch
          isOn={false}
          onColor={primaryColor}
          offColor="#e6e5e3"
          size="medium"
          style={{elevation: 10}}
          isOn={isOn}
          onToggle={(isOn) => setIsOn(isOn)}
        />
      </View>
      <View
        style={{flexDirection: 'row', alignSelf: 'flex-end', marginRight: 10}}>
        <Text
          style={{
            fontSize: 12,
            color: isOn ? primaryColor : 'gray',
            fontWeight: 'bold',
          }}>
          Public
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: !isOn ? primaryColor : 'gray',
            fontWeight: 'bold',
            marginLeft: 4,
          }}>
          Private
        </Text>
      </View>
      <Text
        onPress={() => {
          setChanginEmail(!changingEmail);
        }}
        style={{
          fontFamily: Fonts.CenturyBold,
          fontSize: 15,
          margin: 10,
        }}>
        Change Email
      </Text>

      {changingEmail && (
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Email "
            keyboardType={'email-address'}
            placeholderTextColor="gray"
            value={email}
            onChangeText={(email) => {
              setEmail(email);
            }}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Enter new email"
            keyboardType={'email-address'}
            placeholderTextColor="gray"
            value={confirmEmail}
            onChangeText={(email) => {
              setConfirmEmail(email);
            }}
          />
        </View>
      )}
      <Text
        onPress={() => {
          setChangingPass(!changingPass);
        }}
        style={{
          fontFamily: Fonts.CenturyBold,
          fontSize: 15,
          margin: 10,
        }}>
        Change Password
      </Text>
      {changingPass && (
        <View>
          <TextInput
            style={styles.textinput}
            placeholder="Enter Password "
            keyboardType={'email-address'}
            placeholderTextColor="gray"
            value={pass}
            onChangeText={(pass) => {
              setPassword(pass);
            }}
          />
          <TextInput
            style={styles.textinput}
            placeholder="Confirm Password "
            keyboardType={'email-address'}
            placeholderTextColor="gray"
            value={cnfPass}
            onChangeText={(pass) => {
              setCnfPass(pass);
            }}
          />
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.textinput,
          {
            padding: 12,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: primaryColor,
          },
        ]}>
        <Text style={{fontFamily: Fonts.CenturyBold, color: 'white'}}>
          Save
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Settings;
const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.3,
    justifyContent: 'space-between',
    padding: 5,
  },
  emojiCotainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 300,
  },
  input: {
    width: '80%',
    padding: 10,
  },
  textinput: {
    margin: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    width: '75%',
    alignSelf: 'center',
    elevation: 5,
  },
});
