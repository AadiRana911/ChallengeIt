import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {primaryColor} from '../colors';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
const Component2 = ({navigation}) => {
  const {height} = Dimensions.get('window');
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [transgender, setTrans] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}>
      <View>
        <View style={{margin: 20}}>
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={25}
            color="gray"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={{margin: 15}}>
          <Text style={{fontSize: 25, color: primaryColor, fontWeight: 'bold'}}>
            Sign up
          </Text>
          <Text style={{fontSize: 15}}>Please choose your gender</Text>
        </View>
        <View style={style.genderContainer}>
          <TouchableOpacity
            style={style.gender}
            activeOpacity={0.7}
            onPress={() => {
              setMale(!male);
              setFemale(false);
              setTrans(false);
            }}>
            <Image
              source={require('../../assets/images/male.png')}
              style={[style.genderImg, {tintColor: male ? 'red' : 'black'}]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.gender}
            activeOpacity={0.7}
            onPress={() => {
              setFemale(!female);
              setMale(false);
              setTrans(false);
            }}>
            <Image
              source={require('../../assets/images/female.png')}
              style={[style.genderImg, {tintColor: female ? 'red' : 'black'}]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.gender}
            activeOpacity={0.7}
            onPress={() => {
              setFemale(false);
              setMale(false);
              setTrans(!transgender);
            }}>
            <Image
              source={require('../../assets/images/trans-icon.png')}
              style={[
                style.genderImg,
                {tintColor: transgender ? 'red' : 'black'},
              ]}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View
          style={{
            alignSelf: 'center',
            width: '30%',
            height: 20,
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <View style={[styles.paginationView]}></View>
          <View
            style={[
              styles.paginationView,
              {backgroundColor: primaryColor, borderColor: primaryColor},
            ]}></View>
          <View style={[styles.paginationView]}></View>
          <View style={styles.paginationView}></View>
          {/* <View style = {styles.paginationView}></View> */}
        </View>
        <TouchableOpacity
          style={style.nextButtonStyle}
          onPress={() => navigation.navigate('C3')}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: primaryColor}}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    // backgroundColor: 'tomato',
  },
  gender: {
    height: 100,
    width: 100,
    // margin: 10,
    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#eee',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonStyle: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    alignItems: 'center',
    width: '65%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#eee',
    marginBottom: '20%',
  },
  genderImg: {
    height: '60%',
    width: '60%',
  },
});
export {Component2};
