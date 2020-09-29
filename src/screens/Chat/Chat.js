import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabBar from '../../components/navigation';
import {CheckBox, Avatar, Badge, Header} from 'react-native-elements';
import {Divider} from 'react-native-paper';
import {Fonts} from '../../utils/Fonts';
import {primaryColor} from '../../components/colors';
import Swipeout from 'react-native-swipeout';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const Chat = ({navigation}) => {
  let swipeoutBtns = [
    {
      component: (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <MaterialIcons name="delete" size={30} color="white" />
        </View>
      ),
      backgroundColor: primaryColor,
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {
        alert('hi');
      },
    },
  ];
  const renderItem = ({item, index}) => {
    return (
      <Swipeout right={swipeoutBtns} style={styles.mainContianer} autoClose>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Conversation')}>
          <View style={{flexDirection: 'row'}}>
            {/* // Avatar with mini badge */}
            <View style={{marginLeft: 10}}>
              <Avatar
                rounded
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                }}
                size="medium"
                containerStyle={{marginTop: 10}}
              />

              <Badge
                status="success"
                badgeStyle={{width: 8, height: 8, top: 15}}
                containerStyle={{
                  position: 'absolute',
                  zIndex: 6,
                  alignSelf: 'flex-end',
                  marginBottom: -20,
                }}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                margin: 10,
                alignSelf: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    color: primaryColor,
                    fontFamily: Fonts.CenturyBold,
                  }}>
                  Jhon Doe
                </Text>
                <Text>10:24 PM</Text>
              </View>
              <Text style={{marginTop: 5, fontFamily: Fonts.CenturyRegular}}>
                i like to work with you
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };
  return (
    <SafeAreaView style={styles.mainContianer}>
      <Header
        backgroundColor={primaryColor}
        centerComponent={
          <Text
            style={[
              styles.largeText,
              {
                color: 'white',
                // paddingVertical: 10,
                alignSelf: 'center',
                fontSize: 17,
              },
            ]}>
            Inbox
          </Text>
        }
      />
      {/* <View
        style={{
          backgroundColor: primaryColor,
        }}>
        <Text
          style={[
            styles.largeText,
            {
              color: 'white',
              paddingVertical: 10,
              alignSelf: 'center',
              fontSize: 17,
            },
          ]}>
          Chat
        </Text>
      </View> */}

      <FlatList
        ListFooterComponent={<View style={{margin: 15}} />}
        data={new Array(10)}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
export default Chat;
