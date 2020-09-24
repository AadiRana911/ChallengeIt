import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {primaryColor} from '../../components/colors';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';

const TabBar = ({navigation, params, animateReverse, pauser, from}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          params !== 'Home'
            ? () => {
                pauser();
                navigation.navigate('Home');
              }
            : () => {
                navigation.navigate('Home');
              }
        }>
        <MaterialCommunityIcons
          name={'fire'}
          style={{
            fontSize: 34,
            color: from === 'Home' ? primaryColor : 'white',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={
          params === 'Home'
            ? () => {
                pauser();
                navigation.navigate('Challenges');
              }
            : () => {
                navigation.navigate('Challenges');
              }
        }>
        <MaterialIcons
          name={'slideshow'}
          style={{
            fontSize: 34,
            color: from === 'Chellenges' ? primaryColor : 'white',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={
          params === 'Home'
            ? () => {
                pauser();
                navigation.navigate('Camera');
              }
            : () => {
                navigation.navigate('Camera');
              }
        }>
        <MaterialCommunityIcons
          name={'plus-circle'}
          style={{fontSize: 33, color: 'white'}}
        />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={
          params === 'Home'
            ? () => {
                pauser();
                navigation.navigate('Chat');
              }
            : () => {
                navigation.navigate('Chat');
              }
        }>
        <Entypo
          name={'message'}
          style={{
            fontSize: 30,
            color: from === 'Chat' ? primaryColor : 'white',
          }}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={
          params === 'Home'
            ? () => {
                pauser();
                navigation.navigate('User');
              }
            : () => {
                navigation.navigate('User');
              }
        }>
        <FontAwesome5
          name={'user-alt'}
          style={{fontSize: 24, color: 'white'}}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={
          params === 'Home'
            ? () => {
                pauser();
                navigation.navigate('Notifications');
              }
            : () => {
                navigation.navigate('Notifications');
              }
        }>
        <FontAwesome
          name={'bell'}
          style={{
            fontSize: 24,
            color: from === 'Notifications' ? primaryColor : 'white',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
export default TabBar;
