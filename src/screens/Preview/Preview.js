import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {primaryColor} from '../../components/colors';
import DocumentPicker from 'react-native-document-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import RBSheet from 'react-native-raw-bottom-sheet';

const {height, width} = Dimensions.get('window');
const Preview = ({navigation, route}) => {
  const {video} = route.params;
  const [pause, setPaused] = useState(false);
  const [emoji, setShowEmoji] = useState(false);
  const [emojiIcon, setEmojiIcon] = useState('');
  const emojiRef = useRef(null);
  console.log(video);
  const pickAudio = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  return (
    <View style={{flex: 1}}>
      <TouchableWithoutFeedback
        onPress={() => {
          setPaused(!pause);
        }}>
        <Video
          paused={pause}
          source={{uri: video}}
          style={styles.mediaPlayer}
          volume={0.4}
          resizeMode="cover"
          repeat={true}
        />
      </TouchableWithoutFeedback>
      <Text
        style={{
          fontSize: 90,
          color: 'white',
          position: 'absolute',
          top: 20,
          left: 10,
        }}>
        {emojiIcon}
      </Text>
      <View style={styles.effectsContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{marginVertical: 10}}
          onPress={() => {
            pickAudio();
          }}>
          <FontAwesome
            name="music"
            size={27}
            color="white"
            style={{marginRight: '10%'}}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} style={{marginVertical: 10}}>
          <Ionicons
            name="md-text"
            size={30}
            color="white"
            style={{marginRight: '7%'}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{marginVertical: 10}}
          onPress={() => {
            emojiRef.current.open();
          }}>
          <MaterialCommunityIcons
            name="sticker-emoji"
            size={30}
            color="white"
            style={{marginRight: '7%'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setPaused(true);
            navigation.goBack();
          }}
          activeOpacity={0.7}
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 3,
            alignSelf: 'center',
            marginLeft: 10,

            backgroundColor: 'gray',
          }}>
          <Text style={{fontSize: 15, color: 'white'}}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPaused(true);
            navigation.navigate('Challenge', {video});
          }}
          activeOpacity={0.7}
          style={{
            marginVertical: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 3,
            marginRight: 10,
            alignSelf: 'center',

            backgroundColor: primaryColor,
          }}>
          <Text style={{fontSize: 15, color: 'white'}}>Next</Text>
        </TouchableOpacity>

        <RBSheet
          ref={emojiRef}
          height={400}
          openDuration={250}
          customStyles={{
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: 10,
            },
          }}>
          <EmojiSelector
            category={Categories.all}
            showSearchBar={false}
            onEmojiSelected={(emoji) => {
              emojiRef.current.close();
              setEmojiIcon(emoji);
            }}
            showHistory
          />
        </RBSheet>
     
      </View>
    </View>
  );
};

export default Preview;
const styles = StyleSheet.create({
  mediaPlayer: {
    height: '100%',

    backgroundColor: '#2f2f2f',
  },
  emojiCotainer: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    minHeight: 300,
  },
  effectsContainer: {
    position: 'absolute',
    height: height / 4,
    width: width / 8,
    bottom: height / 6,
    left: width - 55,
    paddingVertical: 10,
  },
});
