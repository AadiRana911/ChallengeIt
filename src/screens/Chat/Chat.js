import React from 'react';
import {View, Text, SafeAreaView, FlatList} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TabBar from '../../components/navigation';
import {CheckBox, Avatar, Badge} from 'react-native-elements';

const Chat = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={new Array(30)}
        keyExtractor={(item) => item}
        renderItem={({item, index}) => {
          return (
            <View style={[styles.notifContainer]} key={index}>
              <View style={{flexDirection: 'row'}}>
                <Avatar
                  source={{
                    uri: 'https://randomuser.me/api/portraits/men/14.jpg',
                  }}
                  size="medium"
                  rounded
                  containerStyle={{marginHorizontal: 4}}
                />

                <Text style={styles.mediumText}>Hi this is new message</Text>
              </View>
              <AntDesign name="close" size={13} color="red" style = {{alignSelf: 'center'}} />
            </View>
          );
        }}
      />
      <TabBar navigation={navigation} params={'Chat'} />
    </SafeAreaView>
  );
};
export default Chat;
