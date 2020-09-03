import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeArea} from 'react-native-safe-area-context';
const Component4 = ({navigation}) => {
  const [canIMove, setCanIMove] = useState(false);
  const [image, setImage] = useState('');
  const {height} = Dimensions.get('window');
  const pickImage = () => {
    ImagePicker.openPicker({}).then((image) => {
      setImage(image.path);
    });
  };

  return (
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'red'}}
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
              style={{fontSize: 25, color: primaryColor, fontWeight: 'bold'}}>
              Sign up
            </Text>
            <Text style={{fontSize: 15}}>
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
              onPress={() => {
                pickImage();
              }}>
              <Image source={{uri: image}} style={styles.gender} />
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
          onPress={() => navigation.navigate('Home')}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: primaryColor}}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
export {Component4};
