import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Linking,
  Alert,
  TouchableHighlight,
  BackHandler,
  TouchableWithoutFeedback,
  Animated,
  TextInput,
} from 'react-native';
import Video from 'react-native-video';
const {width, height} = Dimensions.get('window');
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import styles from '../../screens/Challenges/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Snackbar from 'react-native-snackbar';
import OptionsMenu from 'react-native-options-menu';
import {more, dummy, clap} from '../../assets';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox, Avatar, Badge} from 'react-native-elements';
import Textarea from 'react-native-textarea';
import Modal from 'react-native-modal';
import {Divider} from 'react-native-paper';
import Share from 'react-native-share';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ChallengePlaceholder} from '../../components/Placeholder';
import DoubleTap from '../../components/DoubleTap';
import {Fonts} from '../../utils/Fonts';
import LottieView from 'lottie-react-native';

const ViewResponses = ({navigation}) => {
  const [isclapped, setClapp] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [bilal, setBilal] = useState(false);
  const [myFav, setmyFav] = useState(false);
  const [daring, setDaring] = useState(false);
  const [best, setBest] = useState(false);
  const [nudity, setNudity] = useState(false);
  const [voilence, setVoilence] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [other, setOther] = useState(false);
  const [reportMsg, setReportMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [clapProgress, setClapProgress] = useState(new Animated.Value(0));
  const [searching, setSearching] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));

  const [videos, setVideos] = useState([
    {
      id: 1,
      status: 'success',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isMuted: true,
      shares: '200',
      isVolumeVisible: false,
      liked: false,
    },
    {
      id: 2,
      status: 'success',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isVolumeVisible: false,
      isMuted: true,
      liked: false,

      shares: '200',
    },
    {
      id: 3,
      status: 'error',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isVolumeVisible: false,
      isMuted: true,
      liked: false,
      shares: '200',
    },
    {
      id: 4,
      status: '',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isMuted: true,
      isVolumeVisible: false,
      liked: false,
      shares: '200',
    },
    {
      id: 5,
      status: 'error',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isMuted: true,
      isVolumeVisible: false,
      liked: false,
      shares: '200',
    },
    {
      id: 6,
      status: '',
      uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
      name: 'Zeeshan',
      to: 'Ali Khan',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      shares: '200',
      isVolumeVisible: false,
      isPaused: true,
      isMuted: true,
      liked: false,
    },
  ]);

  // const setAllVidsPause = () => {
  //   setVideos(
  //     videos.map((item) => {
  //       return {
  //         ...item,
  //         isPaused: true,
  //       };
  //     }),
  //   );
  // };
  const handleVideoPause = (id) => {
    setVideos(
      videos.map((item) => {
        if (item.id === id)
          return {
            ...item,
            isPaused: !item.isPaused,
          };
          item.isPaused = true;
        return item;
      }),
    );
  };

  const renderPosts = ({item, index}) => {
    return (
      <View key={index} activeOpacity={0.9} style={[styles.cardStyle]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={3}
              style={[
                {
                  alignSelf: 'center',

                  marginTop: '-2%',
                  marginLeft: 16,
                  width: '95%',
                },
              ]}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    marginTop: 0,
                    color: primaryColor,
                    fontSize: 15,
                  },
                ]}>
                {item.name}
              </Text>{' '}
              <Text style={[styles.mediumText, {fontSize: 15, color: 'black'}]}>
                Challenged{' '}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {color: primaryColor, fontSize: 15},
                ]}>{`${item.to} \n`}</Text>
            </Text>
          </View>
        </View>

        {/* <View style={[styles.horizontalContainer, {margin: 10}]}></View> */}
        <View>
          {/* <DoubleTap singleTap={() => {}} doubleTap={() => {}} delay={200}> */}
          <TouchableWithoutFeedback onPress = {() => handleVideoPause(item.id)}>
          <Video
            source={{uri: item.uri}}
            paused={item.isPaused}
            resizeMode="cover"
            repeat
            style={{
              height: height / 3,
              width: '93%',
              backgroundColor: 'black',
              borderRadius: 20,
              alignSelf: 'center',
            }}
          />
          </TouchableWithoutFeedback>
          {/* </DoubleTap> */}

          {item.isPaused && (
            <Entypo
              name="controller-play"
              color="white"
              style={{
                position: 'absolute',
                top: height / 6 - 35,
                fontSize: 70,
                left: width / 2 - 35,
              }}
              onPress = {() => handleVideoPause(item.id)}
            />
          )}
        </View>

        {/* {item.isVolumeVisible && (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              handleVideoMute(item);
            }}
            style={[
              {
                position: 'absolute',
                right: Platform.OS === 'ios' ? 80 : 20,
                bottom: 70,
                backgroundColor: 'black',
                height: 22,
                width: 22,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                // right: 50,
                padding: 2,
              },
            ]}>
            <Ionicons
              name={item.isMuted ? 'volume-mute' : 'volume-high'}
              color="white"
              style={[styles.playButton]}
            />
          </TouchableOpacity>
        )} */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Ionicons
        name="chevron-back"
        style={{fontSize: 30, margin: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <FlatList
        data={videos}
        keyExtractor={(item, index) => item + index.toString()}
        renderItem={renderPosts}
      />
    </SafeAreaView>
  );
};

export default ViewResponses;
