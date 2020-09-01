import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

import {primaryColor} from '../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const TabBar = ({navigation, params, animateReverse}) => {
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
          style={{fontSize: 34, color: primaryColor}}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
        <FontAwesome
          name={'bell'}
          style={{fontSize: 26, color: primaryColor}}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Add')}>
        <MaterialCommunityIcons
          name={'plus-circle'}
          style={{fontSize: 36, color: primaryColor}}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
        <Entypo name={'message'} style={{fontSize: 28, color: primaryColor}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('User')}>
        <FontAwesome5
          name={'user-alt'}
          style={{fontSize: 26, color: primaryColor}}
        />
      </TouchableOpacity>
    </View>
  );
};
export default TabBar;
