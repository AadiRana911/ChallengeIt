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

const Notification = ({navigation}) => {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.mainContianer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('StudyGuide')}>
          <View style={{flexDirection: 'row'}}>
            {/* // Avatar with mini badge */}
            <View style={{marginLeft: 10}}>
              <Avatar
                rounded
                source={{
                  uri: 'https://randomuser.me/api/portraits/men/12.jpg',
                }}
                size="medium"
                containerStyle={{marginTop: 10}}
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
                  Zaheer01,Muhammad Bilal
                </Text>
              </View>
              <Text style={{fontFamily: Fonts.CenturyRegular}}>
                and 18 others posted new challenges
              </Text>
              <Text
                style={[
                  styles.smallText,
                  {alignSelf: 'flex-start', fontFamily: Fonts.CenturyRegular},
                ]}>
                10:24 PM
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
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
            Notifications
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

      <TabBar
        navigation={navigation}
        params={'Notification'}
        from={'Notifications'}
      />
    </SafeAreaView>
  );
};
export default Notification;
