import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Header} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Fonts} from '../../utils/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../../components/colors';
import OptionsMenu from 'react-native-options-menu';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import RBSheet from 'react-native-raw-bottom-sheet';

const Conversation = ({navigation, route}) => {
  const [message, setMsg] = useState('');
  const [popupEmoji, setPopup] = useState(false);
  const [emoji, setEmoji] = useState('');
  const emojiRef = useRef(null);
  const [messages, setMessages] = useState([
    {id: 0, content: 'hello', user_id: 10, recv_id: 20, createdAt: '10:44 PM'},
    {
      id: 1,
      content: 'hi',
      user_id: 20,
      recv_id: 20,
      createdAt: '10:44 PM',
      send_id: 10,
    },

    {
      id: 2,
      content: 'are  you coming',
      user_id: 10,
      recv_id: 10,
      createdAt: '10:44 PM',
      send_id: 11,
    },

    {
      id: 3,
      content: 'yeah',
      user_id: 10,
      recv_id: 20,
      createdAt: '10:44 PM',
    },

    {
      id: 4,
      content: 'sounds good',
      user_id: 10,
      send_id: 11,
      recv_id: 20,
      createdAt: '10:44 PM',
    },
  ]);

  renderItem = ({item, index}) => {
    return (
      <View>
        <View
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            borderBottomRightRadius: item.send_id === item.userId ? 20 : 0,
            borderTopRightRadius: item.send_id === item.userId ? 30 : 20,
            borderBottomLeftRadius: item.send_id === item.userId ? 0 : 20,
            borderTopLeftRadius: item.recv_id === item.userId ? 20 : 20,
            alignSelf: item.send_id === item.userId ? 'flex-start' : 'flex-end',
            backgroundColor:
              item.send_id === item.userId ? '#5C6C96' : primaryColor,
          }}>
          <Text
            style={{
              textAlign: item.send_id === item.userId ? 'left' : 'right',
              color: '#fff',
            }}>
            {item.content}
          </Text>
        </View>
        <Text
          style={{
            textAlign: item.send_id === item.userId ? 'left' : 'right',
            color: item.send_id === item.userId ? '#000' : '#000',
            fontSize: 12,
            //padding: 10,
            margin: 10,
            marginTop: 0,
          }}>
          {item.createdAt}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor="white"
        rightComponent={
          <OptionsMenu
            customButton={<SimpleLineIcons name="options-vertical" size={20} />}
            options={['Block', 'Report']}
            actions={[
              () => {
                alert('Blocked');
              },
              () => {
                alert('Reported');
              },
            ]}
          />
        }
        leftComponent={
          <AntDesign
            name="arrowleft"
            size={25}
            onPress={() => {
              navigation.goBack();
            }}
          />
        }
        centerComponent={
          <Text style={{fontFamily: Fonts.CenturyBold}}>Raja Sb</Text>
        }
        containerStyle={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}
      />

      <FlatList
        data={messages}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
      <View style={styles.bottom}>
        <TextInput
          placeholder="Send a message"
          style={styles.input}
          value={message}
          onChangeText={(e) => {
            setMsg(e);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            width: message !== '' ? '20%' : '10%',
            justifyContent: 'space-between',
          }}>
          <Entypo
            onPress={() => {
              emojiRef.current.open();
            }}
            name="emoji-happy"
            size={20}
            style={{alignSelf: 'center', marginRight: 5}}
          />
          {message !== '' && (
            <Ionicons
              onPress={() => setMsg('')}
              name="ios-send"
              size={20}
              color={primaryColor}
              style={{alignSelf: 'center', marginRight: 4}}
            />
          )}
        </View>
      </View>

      <RBSheet
        ref={emojiRef}
        height={400}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            // paddingTop: 10,
          },
        }}>
        <EmojiSelector
          category={Categories.all}
          showSearchBar={false}
          onEmojiSelected={(emoji) => {
            emojiRef.current.close();
            setEmoji(emoji);
          }}
          showHistory
          columns={11}
          showSearchBar
        />
      </RBSheet>
    </SafeAreaView>
  );
};

export default Conversation;
const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: 0.3,
    justifyContent: 'space-between',
    padding: 5,
  },
  emojiCotainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 300,
  },
  input: {
    width: '80%',
    padding: 10,
  },
});
