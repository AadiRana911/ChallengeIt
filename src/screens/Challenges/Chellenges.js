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

const Challenges = ({navigation}) => {
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

  const rbsheet = useRef(null);
  const optionSheet = useRef(null);
  const playListRef = useRef(null);
  const reportRef = useRef(null);

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
  const [searchState, setSearchState] = useState(false);
  const [searchWidth, setSearchWidth] = useState(new Animated.Value(0))
  const [buttons, setButton] = useState([
    {id: 0, name: 'New', isActive: true},
    {id: 1, name: 'week before', isActive: false},
    {id: 2, name: '2 days before', isActive: false},
    {id: 3, name: 'Recent', isActive: false},
  ]);
  const [avatars] = useState([
    {id: 0, status: '', uri: 'https://randomuser.me/api/portraits/men/20.jpg'},
    {
      id: 1,
      status: 'success',
      uri: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    {
      id: 2,
      status: 'success',
      uri: 'https://randomuser.me/api/portraits/men/42.jpg',
    },
    {
      id: 3,
      status: 'error',
      uri: 'https://randomuser.me/api/portraits/men/10.jpg',
    },
    {
      id: 4,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/14.jpg',
    },
    {
      id: 5,
      status: 'error',
      uri: 'https://randomuser.me/api/portraits/men/30.jpg',
    },
    {
      id: 6,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    {
      id: 6,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
    {
      id: 6,
      status: '',
      uri: 'https://randomuser.me/api/portraits/men/50.jpg',
    },
  ]);
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
    if (searchState === false){
      Animated.timing(searchWidth, {
        toValue: 400,
        timing: 15000,
      }).start(() => {
        setSearchState(true)
      });
    }else{
      Animated.timing(searchWidth, {
        toValue: 0,
        timing: 15000,
      }).start(() => {
        setSearchState(false)
      });
    }
  }

  const renderPosts = ({item, index}) => {
    return (
      <View key={index} activeOpacity={0.9} style={[styles.cardStyle]}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Image source={dummy} style={styles.userImgStyle} />
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text
              numberOfLines={3}
              style={[
                {
                  alignSelf: 'center',

                  marginTop: '-2%',
                  width: '75%',
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
              <Text style={[styles.mediumText, {fontSize: 15}]}>
                Challenged{' '}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {color: primaryColor, fontSize: 15},
                ]}>{`${item.to} \n`}</Text>
              <Text style={[styles.mediumText]}>
                {item.km}
                {'    '} {item.time}
              </Text>
            </Text>
            <View style={{justifyContent: 'flex-end', height: height / 18}}>
              <Entypo name="eye" style={{fontSize: width / 18.70129}} />
              <Text style={[styles.smallText, {marginTop: -3}]}>
                {item.views}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              height: 27,
              width: 20,
            }}
            onPress={() => optionSheet.current.open()}>
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

        <View style={[styles.horizontalContainer, {margin: 10}]}></View>
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
                borderRadius: 20,
              }}
            />
          </DoubleTap>
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
          <View style={[styles.bottomContainer]}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <MaterialIcons
                name="videocam"
                style={{fontSize: width / 16.45714, color: 'black'}}
              />
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
              <Text style={[styles.smallText, {marginTop: -3}]}>
                {item.views}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback onPress={() => toggleLike(item.id)}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
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
                    height: 24,
                    width: 24,
                    tintColor: item.liked ? primaryColor : 'black',
                    marginLeft: 4,
                  }}
                />
              )}
              <Text style={[styles.smallText, {marginTop: 0}]}>
                {item.claps}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={[
              styles.bottomContainer,
              {flexDirection: 'row', paddingHorizontal: 10},
            ]}>
            <TouchableOpacity onPress={handleShare}>
              <FontAwesome
                name="share"
                style={{fontSize: width / 18.70129, color: 'black'}}
              />
              <Text style={[styles.smallText, {marginTop: -3}]}>
                {item.views}
              </Text>
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
              <Entypo
                name="camera"
                style={{fontSize: width / 18.70129, color: 'black'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const _captureVideo = async () => {
    try {
      ImagePicker.openCamera({
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
  const handleShare = async () => {
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
      <Ionicons
        name="chevron-back"
        style={{fontSize: 30, margin: 10}}
        onPress={() => {
          navigation.goBack();
        }}
      />

      <View
        style={{
          justifyContent: 'center',
          paddingLeft: 5,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Feather
            name="search"
            style={{
              alignSelf: 'center',
              fontSize: 30,
              marginHorizontal: width / 30,
            }}
            onPress={() => {
              animationToggle();
            }}
          />
          <Animated.View style = {{width: searchWidth}}>
            <TextInput
              placeholder="Search..."
              style={{
                width: '80%',
                borderRadius: 3,
                borderWidth: searchState ? 0.4 : 0,
                borderColor: searchState ? '#ddd' : '#fff',
                paddingLeft: 10,
              }}
            />
            </Animated.View>
            <FlatList
              horizontal
              keyExtractor={(item, index) => {
                item + index.toString();
              }}
              data={avatars}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    activeOpacity={1}
                    key={index}
                    onPress={() => {
                      setAllVidsPause();
                      setShowAvatar(!showAvatar);
                    }}>
                    <Avatar
                      source={{
                        uri: item.uri,
                      }}
                      size="medium"
                      rounded
                      containerStyle={{margin: 4}}
                    />

                    <Badge
                      status={item.status === '' ? 'primary' : item.status}
                      value={item.status === 'error' && 'live'}
                      containerStyle={{
                        position: 'absolute',
                        top: item.status === 'error' ? 2 : 8,
                        right: item.status === 'error' ? 0 : 6,
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
        </View>
        <FlatList
          contentContainerStyle={{marginVertical: 5}}
          horizontal
          keyExtractor={(item, index) => {
            item + index.toString();
          }}
          data={buttons}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleItemPress(item);
                }}
                style={{
                  margin: 5,
                  paddingHorizontal: 20,
                  backgroundColor: item.isActive ? primaryColor : '#fff',
                  borderRadius: 100,
                  paddingVertical: 7,
                  justifyContent: 'center',
                  alignItems: 'center',

                  shadowColor: '#000',
                  shadowOffset: {width: 1, height: 0},
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 3,
                  borderWidth: 0.5,
                  borderColor: '#eee',
                }}>
                <Text
                  style={[
                    styles.mediumText,
                    {color: item.isActive ? 'white' : 'gray', fontSize: 14},
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
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
      {showAvatar && (
        <View
          style={{
            height: 240,
            width: '100%',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
          }}>
          <Image
            source={{
              uri:
                'https://image.shutterstock.com/image-photo/islamabad-pakistan-april-25-2019-260nw-1407461093.jpg',
            }}
            style={{
              height: 90,
              width: 90,
              borderRadius: 45,
              top: -40,
              alignSelf: 'center',
            }}
          />
          <Text
            style={[
              styles.largeText,
              {alignSelf: 'center', marginTop: -20, color: primaryColor},
            ]}>
            Jhon Doe
          </Text>
          <Text style={[styles.mediumText, {alignSelf: 'center'}]}>
            1 Km away
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                setShowAvatar(false);
              }}
              style={[
                styles.horizontalContainer,
                {marginLeft: 4, padding: 10},
              ]}>
              <TouchableOpacity
                style={[styles.iconStyle, {backgroundColor: 'teal'}]}>
                <AntDesign
                  name="eye"
                  size={20}
                  color={'white'}
                  style={{alignSelf: 'center', margin: 5}}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.mediumText,
                  {alignSelf: 'center', fontSize: 18, margin: 5},
                ]}>
                Do it
              </Text>
            </TouchableOpacity>
            <Divider style={styles.dividerStyle} />
            <TouchableOpacity
              onPress={() => {
                setShowAvatar(!showAvatar), navigation.navigate('User');
              }}
              style={[
                styles.horizontalContainer,
                {marginLeft: 4, padding: 10},
              ]}>
              <TouchableOpacity
                style={[styles.iconStyle, {backgroundColor: 'tomato'}]}>
                <AntDesign
                  name="user"
                  size={20}
                  color={'white'}
                  style={{alignSelf: 'center', margin: 5}}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.mediumText,
                  {alignSelf: 'center', fontSize: 18, margin: 5},
                ]}>
                View Profile
              </Text>
            </TouchableOpacity>
            <Divider style={styles.dividerStyle} />
          </View>
        </View>
      )}
      <RBSheet
        ref={optionSheet}
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
            Snackbar.show({
              text: ' Saved to playlist',
              duration: Snackbar.LENGTH_LONG,
              fontFamily: Fonts.CenturyRegular,
              action: {
                text: 'Change',
                textColor: 'tomato',
                fontFamily: Fonts.CenturyRegular,

                onPress: () => {
                  optionSheet.current.close();
                  playListRef.current.open();
                },
              },
            });
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
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Save to playlist
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: '95%',
            height: 1,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'Saved to your device',
              duration: Snackbar.LENGTH_SHORT,
            });
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
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Save to your device
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: '95%',
            height: 1,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'Hide',
              duration: Snackbar.LENGTH_SHORT,
            });
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
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Hide
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: '95%',
            height: 1,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'Link Copied',
              duration: Snackbar.LENGTH_SHORT,
            });
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
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Copy Link
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: '95%',
            height: 1,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            reportRef.current.open();
            optionSheet.current.close();
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
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Report Video
          </Text>
        </TouchableOpacity>
        <Divider
          style={{
            width: '95%',
            height: 1,
            marginVertical: 5,
            alignSelf: 'center',
          }}
        />
      </RBSheet>

      <RBSheet
        ref={playListRef}
        height={420}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            setBilal(!bilal);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={bilal}
            checkedColor="red"
            onPress={() => {
              setNudity(!nudity);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Bilal
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setmyFav(!myFav);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={myFav}
            checkedColor="red"
            onPress={() => {
              setmyFav(!myFav);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            My Favourites
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setDaring(!daring);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={daring}
            checkedColor="red"
            onPress={() => {
              setDaring(!daring);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Daring
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setBest(!best);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={best}
            checkedColor="red"
            onPress={() => {
              setBest(!best);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Best
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            Snackbar.show({
              text: 'New playlist added',
            });
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <MaterialIcons
            name="playlist-add"
            size={23}
            color={'gray'}
            style={{alignSelf: 'center', margin: 5}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Add new playlist
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => {
            playListRef.current.close();
          }}>
          <Text
            style={[styles.largeText, {color: 'white', alignSelf: 'center'}]}>
            Save
          </Text>
        </TouchableOpacity>
      </RBSheet>

      <RBSheet
        ref={reportRef}
        height={520}
        openDuration={250}
        customStyles={{
          container: {
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingTop: 10,
          },
        }}>
        <TouchableOpacity
          onPress={() => {
            setNudity(!nudity);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={nudity}
            checkedColor="red"
            onPress={() => {
              setNudity(!nudity);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Nudity
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setVoilence(!voilence);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={voilence}
            checkedColor="red"
            onPress={() => {
              setVoilence(!voilence);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Voilence
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setCheat(!cheat);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={cheat}
            checkedColor="red"
            onPress={() => {
              setCheat(!cheat);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Cheat
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <TouchableOpacity
          onPress={() => {
            setOther(!other);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            center
            checked={other}
            checkedColor="red"
            onPress={() => {
              setOther(!other);
            }}
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            Other
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={(e) => {
            setReportMsg(e);
          }}
          defaultValue={reportMsg}
          maxLength={120}
          placeholder={'write your message'}
          placeholderTextColor={'#c7c7c7'}
          underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => {
            reportRef.current.close();
          }}>
          <Text
            style={[styles.largeText, {color: 'white', alignSelf: 'center'}]}>
            Send
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </SafeAreaView>
  );
};

export default Challenges;
