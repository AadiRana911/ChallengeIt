import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import ImagePicker from 'react-native-image-crop-picker';
import {primaryColor} from '../colors';
import ConfettiCannon from 'react-native-confetti-cannon';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeArea} from 'react-native-safe-area-context';
const Component4 = ({navigation}) => {
  const [canIMove, setCanIMove] = useState(false);
  const [image, setImage] = useState('');
  const [interval, setInterv] = useState(null);
  const confetti = useRef(null);
  const {height} = Dimensions.get('window');

  const pickImage = () => {
    ImagePicker.openPicker({mediaType: 'photo'}).then((image) => {
      setImage(image.path);
    });
  };
  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);
  const handleRegister = () => {
    // confetti.current.start();
    navigation.navigate('Home');

    // const interval = setTimeout(() => {
    // }, 3000);
    // setInterv(interval);
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      contentContainerStyle={{flexGrow: 1, backgroundColor: 'green'}}>
      <View style={styles.container}>
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} ref={confetti} />
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
          {image === '' ? (
            <TouchableOpacity
              style={styles.gender}
              onPress={() => {
                pickImage();
              }}
            />
          ) : (
            <TouchableOpacity
              style={styles.gender}
              onPress={() => {
                pickImage();
              }}>
              <Image
                source={{uri: image}}
                style={[styles.gender, {borderWidth: 2, borderColor: 'white'}]}
              />
            </TouchableOpacity>
          )}
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
          style={styles.nextButtonStyle}
          onPress={() => handleRegister()}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: Fonts.CenturyBold,
              color: primaryColor,
            }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export {Component4};
