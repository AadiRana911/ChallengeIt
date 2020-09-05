import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TabBar = ({navigation, params, animateReverse, pauser}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={
          params !== 'Home'
            ? () => navigation.navigate('Home')
            : () => animateReverse()
        }>
        <MaterialCommunityIcons
          name={'fire'}
          style={{fontSize: 34, color: 'white'}}
        />
      </TouchableOpacity>

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
            color: 'white',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
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
        <Entypo name={'message'} style={{fontSize: 28, color: 'white'}} />
      </TouchableOpacity>

      <TouchableOpacity
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
      </TouchableOpacity>
    </View>
  );
};
export default TabBar;
