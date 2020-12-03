import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
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
import ToggleSwitch from 'toggle-switch-react-native';
import {dummy} from '../../assets';
const Playlists = ({navigation, route}) => {
  const [isOn, setIsOn] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [cnfPass, setCnfPass] = useState('');

  const [data, setData] = useState([
    {id: 0, name: 'playlist 1', image: dummy},
    {id: 1, name: 'playlist 2', image: dummy},
    {id: 2, name: 'playlist 3', image: dummy},
  ]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header
        backgroundColor="white"
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
          <Text
            style={{
              fontFamily: Fonts.CenturyBold,
              fontSize: 15,
              color: primaryColor,
            }}>
            Playlists
          </Text>
        }
        containerStyle={{borderBottomWidth: 0.5, borderBottomColor: 'gray'}}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => {
          item;
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 10,
              }}>
              <TouchableOpacity
                style={styles.playlistContainer}
                onPress={() => {
                  navigation.navigate('PlaylistDetail', {name: item.name});
                }}>
                <Image source={item.image} style={styles.playlistThumb} />
                <Text style={styles.name}>{item.name}</Text>
              </TouchableOpacity>
              <Entypo name="cross" size={12} style={{alignSelf: 'center'}} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Playlists;
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
  textinput: {
    margin: 10,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderRadius: 10,
    width: '75%',
    fontFamily: 'geometriaBold',
    alignSelf: 'center',
    elevation: 5,
  },
  playlistContainer: {
    flexDirection: 'row',
    margin: 10,
  },
  playlistThumb: {
    height: 40,
    width: 40,
    borderRadius: 4,
  },
  name: {
    fontSize: 16,
    fontFamily: Fonts.CenturyBold,
    alignSelf: 'center',
    marginLeft: 10,
  },
});
