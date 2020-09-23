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
import styles from './styles';
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
import TabBar from '../../components/navigation';

const ViewResponses = ({navigation}) => {
  useEffect(() => {
    (async () => {
      requestMultiple(
        (Platform.OS = 'android' && [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]),
      ).then((res) => {
        if (
          res[PERMISSIONS.ANDROID.CAMERA] == 'granted' &&
          res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted' &&
          res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted'
        ) {
        } else {
          Alert.alert('ChallengeIt', 'Please allow all permission', [
            {
              text: 'OPEN SETTINGS',
              onPress: () => Linking.openSettings(),
            },
          ]);
        }
      });
    })();
  }, []);

  const [isclapped, setClapp] = useState(false);

  const [loading, setLoading] = useState(true);
  const [clapProgress, setClapProgress] = useState(new Animated.Value(0));
  const [searching, setSearching] = useState(false);
  const [showAvatar, setShowAvatar] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [searchState, setSearchState] = useState(false);
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0));
  const [isEnd, setIsEnd] = useState(true);
  const [share, setShare] = useState(false);

  const [videos, setVideos] = useState([
    {
      id: 1,
      status: 'success',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      name: 'Zeeshan',
      to: '',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isMuted: true,
      shares: '200',
      isVolumeVisible: false,
      liked: false,
      isShared: false,
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
      isShared: false,
    },
    {
      id: 3,
      status: 'error',
      uri:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      name: 'Zeeshan',
      to: '',
      km: '2 km away',
      time: '3 hours ago',
      claps: '3000',
      views: '300',
      isPaused: true,
      isVolumeVisible: false,
      isMuted: true,
      liked: false,
      shares: '200',
      isShared: false,
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
      isShared: false,
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
      isShared: false,
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
      isShared: false,
      isBottom: true,
    },
  ]);
  const toggleLike = (id) => {
    setVideos(
      videos.map((item) => {
        if (item.id === id)
          return {
            ...item,
            liked: !item.liked,
            claps:
              item.liked === true
                ? parseInt(item.claps) - 1
                : parseInt(item.claps) + 1,
          };
        return item;
      }),
    );
  };

  const setAllVidsPause = () => {
    setVideos(
      videos.map((item) => {
        return {
          ...item,
          isPaused: true,
        };
      }),
    );
  };
  const handleVideoPause = (id) => {
    setVideos(
      videos.map((item) => {
        if (item.id === id)
          return {
            ...item,
            isPaused: !item.isPaused,
          };
        return item;
      }),
    );
  };

  const animationToggle = () => {
    if (searchState === false) {
      Animated.timing(searchWidth, {
        toValue: width / 1.1,
        timing: 15000,
      }).start(() => {
        setSearchState(true);
      });
    } else {
      Animated.timing(searchWidth, {
        toValue: 0,
        timing: 15000,
      }).start(() => {
        setSearchState(false);
      });
    }
  };
  const renderPosts = ({item, index}) => {
    return (
      <View key={index} activeOpacity={0.9} style={[styles.cardStyle]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 5,
          }}>
          <Image source={dummy} style={styles.userImgStyle} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text
              numberOfLines={3}
              style={[
                {
                  alignSelf: 'center',

                  marginTop: '-2%',
                  marginLeft: 15,
                  width: '88%',
                  // backgroundColor: 'tomato',
                },
              ]}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    marginTop: 0,
                    color: primaryColor,
                    fontSize: 14,
                    fontFamily: Fonts.CenturyBold,
                  },
                ]}>
                {item.name}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 14,
                    color: 'black',
                    fontFamily: Fonts.CenturyRegular,
                  },
                ]}>
                {' '}
                {item.to === '' ? 'posted a Challenge' : 'Challenged'}{' '}
              </Text>
              {
                <Text
                  style={[
                    styles.mediumText,
                    {
                      color: primaryColor,
                      fontSize: 14,
                      fontFamily: Fonts.CenturyBold,
                    },
                  ]}>
                  {item.to === '' ? `\n` : `${item.to} \n`}
                </Text>
              }
              <Text
                style={[styles.mediumText, {fontSize: 10, color: '#696866'}]}>
                Posted:
                {''} {item.time} {'\n'}
                {item.km}
                {'   '}
              </Text>

              {/* <Text
                style={[styles.mediumText, {fontSize: 10, color: '#696866'}]}
                onPress={() => {
                  navigation.navigate('ViewRes');
                  handleVideoPause(item.id);
                }}>
                See Full Thread
              </Text> */}
            </Text>
          </View>
          {/* <TouchableOpacity
            style={{
              height: 27,
              width: 20,
              justifyContent: 'center',
              alignItems: 'center',

              marginRight: 9,
              marginTop: 5,
            }}
            onPress={() => {
              navigation.navigate('ViewRes');
              handleVideoPause(item.id);
            }}>
            <AntDesign name="retweet" size={20} />
          </TouchableOpacity> */}
          <TouchableOpacity
            style={{
              height: 27,
              width: 20,
            }}
            onPress={() => alert('pressed')}>
            <Image
              source={more}
              style={{
                top: height / 70,
                height: 17,
                width: 17,
                tintColor: 'black',
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={[
            styles.mediumText,
            {
              fontSize: 10,
              color: primaryColor,
              alignSelf: 'flex-start',
              margin: 4,
            },
          ]}
          onPress={() => {
            navigation.navigate('Hashtag');
            handleVideoPause(item.id);
          }}>
          #Kiki Challenge
        </Text>
        <View style={[styles.horizontalContainer]}></View>
        <View>
          <DoubleTap
            singleTap={() => {
              handleVideoPause(item.id);
            }}
            doubleTap={() => {
              toggleLike(item.id);
            }}
            delay={200}>
            <Video
              source={{uri: item.uri}}
              paused={item.isPaused}
              resizeMode="cover"
              repeat
              style={{
                height: height / 2,
                width: '100%',
                backgroundColor: 'black',
                // borderRadius: 20,
              }}
            />
          </DoubleTap>
          <View
            style={{
              position: 'absolute',
              bottom: 5,
              right: 0,
              height: height / 20,
              // backgroundColor: 'rgba(100,100,100,0.4)',
              // shadowColor: '#000',
              // shadowOffset: {width: 1, height: 0},
              // shadowOpacity: 0.3,
              // shadowRadius: 5,
              // elevation: 3,
              // borderRadius: 3,
              // // borderWidth: 0.5,
              // // borderColor: '#eee',
              flexDirection: 'row',
              alignItems: 'center',
              marginRight: 10,
              // width: 45,
              justifyContent: 'space-between',
            }}>
            <Entypo
              name="eye"
              size={20}
              style={{marginRight: 7, color: 'white'}}
            />
            <Text
              style={[
                styles.smallText,
                {marginTop: -3, color: 'white', fontWeight: 'bold'},
              ]}>
              {item.views}
            </Text>
          </View>
          {item.isPaused && (
            <Entypo
              name="controller-play"
              color="white"
              style={[styles.playButton]}
              onPress={() => {
                handleVideoPause(item.id);
              }}
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

        <View
          style={[
            styles.horizontalContainer,
            {justifyContent: 'space-between'},
          ]}>
          <View style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback onPress={() => toggleLike(item.id)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 4,
                  // alignSelf: 'center',
                  // backgroundColor: 'tomato',
                }}>
                {item.liked ? (
                  <LottieView
                    source={require('../../utils/clap.json')}
                    style={{
                      height: 32,
                      width: 32,
                      backgroundColor: 'transparent',
                    }}
                    progress={clapProgress}
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    resizeMode={'contain'}
                    source={clap}
                    style={{
                      height: 22,
                      width: 22,
                      tintColor: item.liked ? primaryColor : 'black',
                      marginLeft: item.liked ? 0 : 15,
                    }}
                  />
                )}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={[
                      styles.smallText,
                      {
                        alignSelf: 'center',
                        opacity: 0.7,
                        color: 'black',

                        // marginLeft: item.liked ? 0 : 15,
                        // marginBottom: item.liked ? -5 : 0,
                      },
                    ]}>
                    {item.claps}{' '}
                  </Text>
                  <Text
                    style={[
                      styles.smallText,

                      {
                        // marginTop: item.liked ? -5 : 0,
                        // marginLeft: item.liked ? 0 : 15,
                        marginBottom: 1,
                      },
                    ]}>
                    claps
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Responses')}
                activeOpacity={0.5}>
                <MaterialIcons
                  name="videocam"
                  style={{
                    fontSize: width / 16.45714,
                    color: 'black',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              {/* <MaterialIcons
                name="reply"
                color="orange"
                style={{
                  fontSize: width / 20.57142,
                  // position: 'absolute',
                  // top: '50%',
                  // left: '50%',
                }}
              /> */}
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.smallText,
                    {alignSelf: 'center', opacity: 0.7, color: 'black'},
                  ]}>
                  {item.claps}{' '}
                </Text>
                <Text style={[styles.smallText]}>views</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.bottomContainer,
              {flexDirection: 'row', paddingHorizontal: 10},
            ]}>
            <TouchableOpacity
              onPress={() => {
                handleVideoPause(item.id);
                _captureVideo();
              }}>
              {/* <Text style={[styles.smallText, {alignSelf: 'center'}]}></Text> */}

              <TouchableOpacity activeOpacity={0.5} style={{marginTop: 2}}>
                <Entypo
                  name="camera"
                  style={{
                    fontSize: width / 18.70129,
                    color: 'black',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              <Text style={[styles.smallText]}>Accept</Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.bottomContainer,
              {
                flexDirection: 'row',
                alignSelf: 'center',
              },
            ]}>
            <TouchableOpacity onPress={handleShare}>
              <TouchableOpacity
                onPress={() => handleShare(item.id)}
                activeOpacity={0.5}>
                <FontAwesome
                  name="share"
                  style={{
                    fontSize: width / 18.70129,
                    color: item.isShared ? primaryColor : 'black',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.smallText,
                    {alignSelf: 'center', opacity: 0.7, color: 'black'},
                  ]}>
                  {item.claps}{' '}
                </Text>
                <Text style={[styles.smallText, {marginTop: -1}]}>shares</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {item.isBottom && <View style={{marginVertical: 30}} />}
      </View>
    );
  };

  const _captureVideo = async () => {
    try {
      ImagePicker.openPicker({
        mediaType: 'video',
      }).then((result) => {
        navigation.navigate('Response', {video: result.path});
        // setTimeout(() => {
        //   setImages(medai);
        // }, 200);
      });
    } catch (E) {
      console.log(E);
    }
  };
  const handleShare = async (id) => {
    setVideos(
      videos.map((item) => {
        if (item.id === id)
          return {
            ...item,
            isShared: !item.isShared,
            shares:
              item.isShared === true
                ? parseInt(item.shares) - 1
                : parseInt(item.shares) + 1,
          };
        return item;
      }),
    );
    let options = {
      title: 'Challenge IT',
      message: 'Hello',
    };
    Share.open(options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };
  const handleItemPress = (id) => {
    setButton(
      buttons.map((item) => {
        item.isActive = false;
        if (item.id === id.id)
          return {
            ...item,
            isActive: !item.isActive,
          };
        return item;
      }),
    );
  };

  const onViewRef = useRef((viewableItmes) => {
    if (viewableItmes.viewableItems.length > 0) {
      setVideos(
        videos.map((item) => {
          item.isPaused = true;
          if (item.id === viewableItmes.changed[0].item.id)
            return {
              ...item,
              isPaused: !item.isPaused,
              isVolumeVisible: !item.isVolumeVisible,
            };
          return item;
        }),
      );
    }
  });

  const viewConfigRef = useRef({
    itemVisiblePercentThreshold: 200,
    minimumViewTime: 5,
    // waitForInteraction: true,
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: primaryColor,
          paddingVertical: 10,
        }}>
        <AntDesign
          onPress={() => {
            navigation.goBack();
          }}
          name="arrowleft"
          style={{
            // alignSelf: 'center',
            fontSize: 26,
            color: 'white',
            marginLeft: 5,
            // marginHorizontal: width / 30,
          }}
        />
        <View style={{width: '80%', alignItems: 'center'}}>
          <Text
            style={[
              styles.largeText,
              {
                color: 'white',

                alignSelf: 'center',
              },
            ]}>
            #KikiChallenge Thread
          </Text>
        </View>
        {/* <View style={{flexDirection: 'row'}}>
          <Feather
            name="search"
            style={{
              alignSelf: 'center',
              fontSize: 26,
              color: 'white',
              marginHorizontal: width / 30,
            }}
            onPress={() => {
              animationToggle();
            }}
          />
          <Animated.View style={{width: searchWidth}}>
            <TextInput
              placeholder="Search..."
              placeholderTextColor={'white'}
              style={{
                width: '80%',
                borderRadius: 3,
                borderBottomWidth: searchState ? 0.8 : 0,
                borderColor: searchState ? '#ddd' : '#fff',
                paddingLeft: 10,
                color: 'white',
              }}
            />
          </Animated.View>
        </View> */}
      </View>

      {loading === false ? (
        <ChallengePlaceholder type={'question'} />
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item, index) => item + index.toString()}
          renderItem={renderPosts}
          onViewableItemsChanged={onViewRef.current}
          viewabilityConfig={viewConfigRef.current}
        />
      )}
    </SafeAreaView>
  );
};

export default ViewResponses;
