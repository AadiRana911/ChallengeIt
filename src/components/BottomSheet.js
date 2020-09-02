import React, {createRef} from 'react';

import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import styles from '../screens/Challenges/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Divider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import OptionsMenu from 'react-native-options-menu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const BottomSheet = ({ref}) => {
  return (
    <RBSheet
      ref={ref}
      height={360}
      openDuration={250}
      customStyles={{
        container: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          paddingTop: 20,
        },
      }}>
      <TouchableOpacity
        onPress={() => {
          ref.current.close();
          navigation.navigate('Home');
        }}
        style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
        <TouchableOpacity style={styles.iconStyle}>
          <MaterialIcons
            name="playlist-add"
            size={23}
            color={'white'}
            style={{alignSelf: 'center', margin: 5}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.large,
            {alignSelf: 'center', fontSize: 18, margin: 5},
          ]}>
          Save to playlist
        </Text>
      </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity
        onPress={() => {
          ref.current.close();
        }}
        style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
        <TouchableOpacity
          style={[styles.iconStyle, {backgroundColor: 'tomato'}]}>
          <Feather
            name="download"
            size={23}
            color={'white'}
            style={{alignSelf: 'center', margin: 5}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.large,
            {alignSelf: 'center', fontSize: 18, margin: 5},
          ]}>
          Record your response
        </Text>
      </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity
        onPress={() => {
          ref.current.close();
        }}
        style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
        <TouchableOpacity
          style={[styles.iconStyle, {backgroundColor: '#4f90f7'}]}>
          <MaterialCommunityIcons
            name="eye-off-outline"
            size={23}
            color={'white'}
            style={{alignSelf: 'center', margin: 5}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.large,
            {alignSelf: 'center', fontSize: 18, margin: 5},
          ]}>
          Hide
        </Text>
      </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity
        onPress={() => {
          ref.current.close();
          alert('Copied');
        }}
        style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
        <TouchableOpacity
          style={[styles.iconStyle, {backgroundColor: '#9661ff'}]}>
          <MaterialCommunityIcons
            name="content-copy"
            size={21}
            color={'white'}
            style={{alignSelf: 'center', margin: 5}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.large,
            {alignSelf: 'center', fontSize: 18, margin: 5},
          ]}>
          Copy Link
        </Text>
      </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
      <TouchableOpacity
        onPress={() => {
          ref.current.close();
          alert('Reported');
          // _captureVideo();
        }}
        style={[styles.horizontalContainer, {marginLeft: 4, padding: 10}]}>
        <TouchableOpacity
          style={[styles.iconStyle, {backgroundColor: '#b53a42'}]}>
          <MaterialIcons
            name="report"
            size={21}
            color={'white'}
            style={{alignSelf: 'center', margin: 5}}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.large,
            {alignSelf: 'center', fontSize: 18, margin: 5},
          ]}>
          Report Video
        </Text>
      </TouchableOpacity>
      <Divider style={styles.dividerStyle} />
    </RBSheet>
  );
};

export default BottomSheet;
