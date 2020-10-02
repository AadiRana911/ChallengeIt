import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Animated,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import Textarea from 'react-native-textarea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OptionsMenu from 'react-native-options-menu';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CheckBox, Header} from 'react-native-elements';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';
import Share from 'react-native-share';
import DoubleTap from '../../components/DoubleTap';
import Video from 'react-native-video';
import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './styles';
import {PLAYER_STATES} from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';
import ViewPager from '@react-native-community/viewpager';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {primaryColor} from '../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabBar from '../../components/navigation';
import ProfileScreen from '../ProfileScreen';
import {useFocusEffect} from '@react-navigation/native';
import {Divider} from 'react-native-elements';
import LottieView from 'lottie-react-native';
import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import Geolocation from 'react-native-geolocation-service';

//redux
import {connect} from 'react-redux';
import {getChallenges} from '../../redux/actions/app';

const Feed = ({
  navigation,
  route,
  getChallenges,
  token,
  user,
  allchallenges,
}) => {
  const reportRef = useRef(null);
  const playListRef = useRef(null);
  const animation = useRef(null);

  // const {from} = route.params && route.params;
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = setPaused(false);
      grabChallenges();

      return () => {
        setPaused(!paused);
        unsubscribe;
      };
    }, []),
  );
  let player;

  const [paused, setPaused] = useState(true);
  const [nextPaused, setNextPaused] = useState(true);
  const [isCurrentScreenEnabled, setIsCurrentScreenEnabled] = useState(true);
  const [isText1Active, setIsText1Active] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(0);
  const [bilal, setBilal] = useState(false);
  const [myFav, setmyFav] = useState(false);
  const [daring, setDaring] = useState(false);
  const [best, setBest] = useState(false);
  const [nudity, setNudity] = useState(false);
  const [voilence, setVoilence] = useState(false);
  const [cheat, setCheat] = useState(false);
  const [other, setOther] = useState(false);
  const [reportMsg, setReportMsg] = useState('');
  const [clapProgress, setClapProgress] = useState(new Animated.Value(0));
  const [videoLoad, SetVideoLoad] = useState(true);
  const [vids, setVids] = useState([
    {
      id: 0,
      vid:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',

      // [paused, setPaused]: useState(false),
      name: '@ Zaheer01',
      hashtag: '#Kiki Challange',
      downloads: '2000',
      claps: '2000',
      shares: '2000',
      loading: true,
      liked: false,
    },
    {
      id: 1,
      vid:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      // [paused, setPaused]: useState(false),
      name: '@ Zaheer01',
      hashtag: '#Kiki Challange',
      downloads: '2000',
      claps: '2000',
      shares: '2000',
      loading: true,
      liked: false,
    },
    {
      id: 2,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      // [paused, setPaused]: useState(false),
      name: '@ Zaheer01',
      hashtag: '#Kiki Challange',
      downloads: '2000',
      claps: '2000',
      shares: '2000',
      loading: true,
      liked: false,
    },
    {
      id: 3,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      // [paused, setPaused]: useState(false),
      name: '@ Zaheer01',
      hashtag: '#Kiki Challange',
      downloads: '2000',
      claps: '2000',
      shares: '2000',
      liked: false,
      loading: true,
    },
  ]);

  const [active, setActive] = useState(0);

  const {width, height} = Dimensions.get('window');
  const xImg = width - 80;
  const xStrip = width - 56;
  const xScreen = width + 40;
  const [translateXImg, setTranslateXImg] = useState(new Animated.Value(0));

  const [translateXCurrentImg] = useState(new Animated.Value(0));
  const [translateYImg] = useState(new Animated.Value(0));
  const [translateXStrip] = useState(new Animated.Value(0));
  const [translateXScreen] = useState(new Animated.Value(0));
  const [translateBottomImageStripX] = useState(new Animated.Value(0));
  const [translateBottomIconsX] = useState(new Animated.Value(0));
  const [isClap, setClapped] = useState(false);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const handleImageSlideX = () => {
    Animated.spring(translateXImg, {
      toValue: -width + width / 4.4,
      // toValue: -wi,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleImageSlideY = () => {
    Animated.spring(translateYImg, {
      toValue: -height / 10,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleBottomImageStripX = () => {
    Animated.spring(translateBottomImageStripX, {
      toValue: -width,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };

  const handleBottomIconsX = () => {
    Animated.spring(translateBottomIconsX, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };

  const handleCurrentImageSlideX = () => {
    Animated.spring(translateXCurrentImg, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const handleCurrentImageSlideXReverse = () => {
    Animated.spring(translateXCurrentImg, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const handleStripSlide = () => {
    Animated.spring(translateXStrip, {
      toValue: 60,
      duration: 5,
      useNativeDriver: true,
    }).start();
  };
  const handleScreenSlide = () => {
    Animated.spring(translateXScreen, {
      toValue: -width,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const handleImageSlideXReverse = () => {
    Animated.spring(translateXImg, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleImageSlideYReverse = () => {
    Animated.spring(translateYImg, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleStripSlideReverse = () => {
    Animated.spring(translateXStrip, {
      toValue: 0,
      duration: 5,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleBottomImageStripXReverse = () => {
    Animated.spring(translateBottomImageStripX, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };

  const handleBottomIconsXReverse = () => {
    Animated.spring(translateBottomIconsX, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };

  const handleScreenSlideReverse = () => {
    Animated.spring(translateXScreen, {
      toValue: 0,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };
  const animateReverse = () => {
    handleImageSlideXReverse();
    handleImageSlideYReverse();
    handleCurrentImageSlideXReverse();
    handleStripSlideReverse();
    handleScreenSlideReverse();
    handleBottomImageStripXReverse();
    handleBottomIconsXReverse();
    setIsCurrentScreenEnabled(true);
    setNextPaused(true);
    setPaused(false);
  };
  const animate = () => {
    handleImageSlideX();
    handleImageSlideY();
    handleCurrentImageSlideX();
    handleStripSlide();
    handleScreenSlide();
    handleBottomImageStripX();
    handleBottomIconsX();
    setIsCurrentScreenEnabled(false);
    setPaused(true);
    setNextPaused(false);
  };
  const addToPlayList = () => {
    Snackbar.show({
      text: ' Saved to playlist',
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'Change',
        onPress: () => {
          setPaused(true);
          playListRef.current.open();
        },
      },
    });
  };
  /*download file*/
  const actualDownload = (vid) => {
    const downloadDest = `${RNFS.DocumentDirectoryPath}/${
      (Math.random() * 1000) | 0
    }.mp4`;
    // http://wvoice.spriteapp.cn/voice/2015/0902/55e6fc6e4f7b9.mp3
    const formUrl = vid;

    const options = {
      fromUrl: formUrl,
      toFile: downloadDest,
      background: true,
      begin: (res) => {
        console.log('begin', res);
        console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
      },
      progress: (res) => {
        let pro = res.bytesWritten / res.contentLength;
      },
    };
    try {
      const ret = RNFS.downloadFile(options);
      ret.promise
        .then((res) => {
          console.log('success', res);

          console.log('file://' + downloadDest);

          // such as saving a picture
          CameraRoll.save(downloadDest)
            .then(() => {
              ToastAndroid.showWithGravity(
                'Your file has been downloaded',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            })
            .catch(() => {
              ToastAndroid.showWithGravity(
                'Something bad happened',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            });
        })
        .catch((err) => {
          console.log('err', err);
        });
    } catch (e) {
      console.log(error);
    }
  };

  const grabChallenges = () => {
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          let {latitude, longitude} = position.coords;
          if (latitude && longitude) {
            const params = new FormData();
            params.append('lat', latitude);
            params.append('long', longitude);
            new Promise((rsl, rej) => {
              getChallenges(params, token, rsl, rej);
            })
              .then((res) => {
                allchallenges &&
                  setVideos(
                    allchallenges.map((item) => {
                      return {
                        ...item,
                        isPaused: true,
                        isMuted: false,
                        liked: false,
                        isShared: false,
                      };
                    }),
                  );
                // setLoading(false);
                console.log(res);
              })
              .catch((err) => {
                // setLoading(false);
                console.log(err);
              });
          }
        },
        (error) => {
          console.log(error);
          // See error code charts below.
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } catch (err) {
      console.log(err);
    }
  };

  const download = async (vid) => {
    try {
      requestMultiple(
        (Platform.OS = 'android' && [
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        ]),
      ).then((res) => {
        if (
          res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted' &&
          res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted'
        ) {
          actualDownload(vid);
        } else {
          Alert.alert('ChallengeIt', 'Please allow all permission', [
            {
              text: 'OPEN SETTINGS',
              onPress: () => Linking.openSettings(),
            },
          ]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const toggleLike = (id) => {
    setVids(
      vids.map((item) => {
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
  const handleVideoLoading = (id) => {
    setVids(
      vids.map((item) => {
        item.loading = true;
        if (item.id === id)
          return {
            ...item,
            loading: !item.loading,
          };
        return item;
      }),
    );
  };

  // const vidPause = (id) => {
  //   setVids(
  //     vids.map((item) => {
  //       if (item.id === id)
  //       return {

  //       }
  //     })
  //   )
  // }
  const handleVideoPause = (id) => {
    setVids(
      vids.map((item) => {
        item.paused = true;
        if (item.id === id)
          return {
            ...item,
            paused: !item.paused,
          };
        return item;
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#2f2f2f'}}>
      <ViewPager
        onPageSelected={(e) => {
          setActive(e.nativeEvent.position);
          setPaused(false);
          console.log(active);
        }}
        orientation="vertical"
        style={{flex: 1}}
        initialPage={0}>
        {allchallenges &&
          allchallenges.map((item) => (
            // <TouchableOpacity
            //   key={item.id}
            //   style={{flex: 1}}
            //   activeOpacity={1}
            //   onPress={() => {
            //     setPaused(!paused);
            //   }}>

            <DoubleTap
              key={item.id}
              style={{flex: 1}}
              singleTap={() => {
                setPaused(!paused);
              }}
              doubleTap={() => {
                toggleLike(item.id);
              }}
              delay={200}>
              <Video
                paused={Number(item.challenge_id) !== active || paused}
                source={{uri: item.file}}
                style={styles.mediaPlayer}
                resizeMode="cover"
                volume={0.4}
                onReadyForDisplay={() => {
                  handleVideoLoading(item.id);
                }}
              />

              <Animated.View
                style={{
                  position: 'absolute',
                  height: height / 3.5,
                  width: width / 8,
                  bottom: height / 6,
                  left: width - 62,

                  // justifyContent: 'space-between',
                  // alignItems: 'center',
                  transform: [{translateX: translateBottomIconsX}],
                }}>
                <Ionicons
                  name="checkmark-circle"
                  color="white"
                  size={25}
                  style={{color: '#4cc76c'}}
                />
                <OptionsMenu
                  customButton={
                    <Entypo
                      name="dots-three-horizontal"
                      style={{
                        fontSize: 30,
                        color: 'white',
                        // marginVertical: 4,
                        // alignSelf: 'center',
                      }}
                    />
                  }
                  options={['Add to playlist', 'Report Video']}
                  actions={[addToPlayList, () => reportRef.current.open()]}
                />

                <View
                  style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    marginTop: -2,
                  }}>
                  <TouchableOpacity>
                    <Entypo
                      name="eye"
                      size={25}
                      style={{
                        color: 'white',
                        // alignSelf: 'center',
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 9,
                      color: 'white',
                      fontFamily: Fonts.CenturyBold,
                    }}>
                    {item.views}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    toggleLike(item.id);
                  }}>
                  <View
                    style={{
                      // alignItems: 'center',
                      // justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    {item.liked ? (
                      <LottieView
                        source={require('../../utils/clap.json')}
                        style={{
                          height: 37,
                          width: 37,

                          // marginRight: -22,
                          overflow: 'hidden',
                        }}
                        autoPlay
                        loop
                      />
                    ) : (
                      <Image
                        source={require('../../assets/images/clap.png')}
                        style={{
                          tintColor: item.liked ? primaryColor : 'white',
                          height: 27,
                          width: 27,
                          marginLeft: 5,
                        }}
                      />
                    )}

                    <Text
                      style={{
                        fontSize: 9,
                        // marginRight: item.liked ? -25 : 0,
                        marginLeft: item.liked ? 0 : 4,
                        color: 'white',
                        fontFamily: Fonts.CenturyBold,
                        marginTop: !item.liked ? 4 : 0,
                      }}>
                      {item.claps}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <TouchableOpacity onPress={() => download(item.vid)}>
                    <MaterialCommunityIcons
                      name="download"
                      style={{fontSize: 30, color: 'white'}}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 9,
                      marginLeft: 4,
                      color: 'white',
                      fontFamily: Fonts.CenturyBold,
                    }}>
                    {item.downloads}
                  </Text>
                </View>
                <View
                  style={{
                    // alignItems: 'center',
                    // justifyContent: 'center',
                    marginTop: 10,
                  }}>
                  <Entypo
                    name="forward"
                    style={{fontSize: 30, color: 'white'}}
                    onPress={() => {
                      handleShare();
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 9,

                      color: 'white',
                      fontFamily: Fonts.CenturyBold,
                    }}>
                    {item.shares}
                  </Text>
                </View>
              </Animated.View>

              <Animated.View
                style={{
                  position: 'absolute',
                  bottom: height / 30,
                  // left: width / 20,
                  // width: '100%',
                  // alignItems: 'center',
                  // flexDirection: 'row',
                  transform: [{translateX: translateBottomImageStripX}],
                }}>
                {/* <TouchableOpacity
                onPress={() => {
                  setPaused(true);
                  navigation.navigate('User');
                }}>
                <Image
                  source={require('../../assets/images/samplechallenger.jpg')}
                  style={{
                    borderRadius: 30,
                    borderWidth: width / 205.714,
                    height: width / 6.857,
                    width: width / 6.857,
                    borderColor: 'white',
                    marginRight: 10,
                  }}
                  resizeMode="cover"
                />
              </TouchableOpacity> */}

                <Text
                  onPress={() => {
                    navigation.navigate('User', {uid: 57});
                  }}
                  style={{
                    color: 'white',
                    fontSize: width / 22,
                    fontFamily: Fonts.CenturyBold,
                    marginLeft: 13,
                  }}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  style={{padding: 10}}
                  onPress={() => {
                    navigation.navigate('Hashtag');
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: Fonts.CenturyRegular,
                      fontSize: width / 30,
                      marginLeft: 7,
                      // marginVertical: 5,
                    }}>
                    {item.hashtag}
                  </Text>
                </TouchableOpacity>
              </Animated.View>
              {/* {item.loading && (
              <LottieView
                source={require('../../utils/loading.json')}
                style={{
                  position: 'absolute',
                  width: '110%',
                  bottom: '0%',
                  padding: 0,
                  left: -20,
                  right: 0,
                }}
                autoPlay
                loop
              />
            )} */}
            </DoubleTap>
          ))}
      </ViewPager>

      {/* <ViewPager
        onPageSelected={(e) => {
          setActive(e.nativeEvent.position);
          // setPaused(true);
        }}
        orientation="vertical"
        style={{height: '93%'}}
        initialPage={0}>
        {vids.map((item, index) => {
          return (
            <TouchableOpacity key={index} activeOpacity={1}>
              <Video
                paused={item.paused}
                source={{uri: item.vid}}
                style={styles.mediaPlayer}
                volume={0.4}
                // onTouchStart={() => {
                //   setPaused(!paused);
                // }}
                filterEnable
                resizeMode="cover"
                repeat={true}
                onReadyForDisplay={() => {
                  handleVideoLoading(item.id);
                }}
              />
            
              )}
            </TouchableOpacity>
          );
        })}
      </ViewPager> */}
      {/* {from !== 'user' && ( */}

      {/* )} */}
      {/* {from !== 'user' && ( */}
      {/* <ProfileScreen
        translateScreen={translateXScreen}
        translateXImg={translateXImg}
        translateYImg={translateYImg}
        paused={nextPaused}
        animateReverse={animateReverse}
        setPaused={setNextPaused}
        style={styles.mediaPlayer}
        volume={10}
        navigation={navigation}
        resizeMode="cover"
        repeat={true}
      /> */}
      {/* )} */}
      <View
        style={{
          position: 'absolute',
          top: height / 6,
          left: width - width / 5.2,
        }}
        config={config}
        onSwipeLeft={animate}>
        <Animated.View
          style={{
            top: 1,
            left: width / 13.71428,
            position: 'absolute',
            width: width,
            height: width / 8.4,
            backgroundColor: primaryColor,
            transform: [{translateX: translateXStrip}],
          }}
        />
        <TouchableOpacity
          onPress={() => {
            setPaused(!paused);
            setActive(1);
            console.log('profile', paused, active);
            navigation.navigate('ProfileScreen');
          }}>
          <Animated.Image
            source={require('../../assets/images/samplechallenger.jpg')}
            style={{
              borderRadius: 30,
              borderWidth: width / 205.714,
              height: width / 8,
              width: width / 8,
              transform: [{translateX: translateXCurrentImg}],
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
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
              styles.large,
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
              styles.large,
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
              styles.large,
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
              styles.large,
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
              styles.large,
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
            setPaused(false);
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
      {/* <TabBar
        navigation={navigation}
        params={'Home'}
        animateReverse={animateReverse}
        pauser={() => setPaused(true)}
        from={'Home'}
      /> */}
    </View>
  );
};
const mapStateToProps = (state) => {
  const {allchallenges} = state.app;
  const {token, user} = state.auth;
  return {token, user, allchallenges};
};
export default connect(mapStateToProps, {getChallenges})(Feed);
