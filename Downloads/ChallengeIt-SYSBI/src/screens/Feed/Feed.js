import React, {useState, useEffect, useRef, Component} from 'react';
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
  SafeAreaView,
  Platform,
  ActivityIndicator,
  FlatList,
  TextInput,
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
import VideoPlayer from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
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
const {width, height} = Dimensions.get('window');
import {BASE_URL} from '../../redux/base-url';
//fcm
import {fcmService} from '../../Notifications/FCMService';
import {localNotificationService} from '../../Notifications/LocalNotificationService';

//socket
import io from 'socket.io-client';

//redux
import {connect} from 'react-redux';
import {
  getChallenges,
  getPlayLists,
  addClap,
  addDownload,
  addShare,
  addPlaylist,
  vidToPlaylist,
  reportVideo,
} from '../../redux/actions/app';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      paused: false,
      nudity: false,
      cheat: false,
      voilence: false,
      other: false,
      loading: false,
      add: false,
      playlistName: '',
      videos: [],
      playlists: [],
      challangeId: '',
      note: '',
    };
  }

  componentDidMount = async () => {
    // this.connectSocket();
    const {navigation} = this.props;
    this.grabChallenges();
    this.focusListener = navigation.addListener('focus', () => {
      this.grabChallenges();
    });

    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    function onRegister(token) {
      console.log('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
      };

      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify.item.title);
      if (notify.item.title === 'Clap') {
        navigation.navigate('NotificationDetail');
      }
    }
  };

  componentWillUnmount = () => {
    this.focusListener;
    console.log('[App] unRegister');
    fcmService.unRegister();
    localNotificationService.unregister();
  };

  grabChallenges = async () => {
    const from = this.props.route.params && this.props.route.params.from;
    const id = this.props.route.params && this.props.route.params.challenge_id;

    console.log('id ----->', id, from);
    console.log('withing grabChallanges');
    try {
      Geolocation.getCurrentPosition(
        async (position) => {
          let {latitude, longitude} = position.coords;
          if (latitude && longitude) {
            const params = new FormData();
            params.append('lat', latitude);
            params.append('long', longitude);
            from === 'yes' && params.append('my_challenge', 'yes');
            id && params.append('challenge_id', id);

            console.log(params);
            new Promise((rsl, rej) => {
              this.setState({loading: true});

              this.props.getChallenges(params, this.props.token, rsl, rej);
            })
              .then((res) => {
                new Promise((rsl, rej) => {
                  this.props.getPlayLists(this.props.token, rsl, rej);
                })
                  .then((res) => {
                    this.setState({
                      loading: false,
                      playlists: this.props.playlists.map((item) => {
                        return {
                          ...item,
                          checked: false,
                        };
                      }),
                    });
                    console.log(res, 'playlists');
                  })
                  .catch((err) => {
                    this.setState({loading: false});
                  });

                this.setState({
                  videos:
                    this.props.allchallenges &&
                    this.props.allchallenges.map((item) => {
                      return {
                        ...item,
                        loading: true,
                      };
                    }),
                });

                console.log('Res', res);
              })
              .catch((err) => {
                this.setState({loading: false});

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

  handlePause = (i) => {
    this.setState(
      {
        videos: this.state.videos.map((item) => {
          console.log('item', item, i);
          item.paused = true;
          if (parseInt(item.challenge_id) == i + 1)
            return {
              ...item,
              paused: !item.paused,
            };
          return item;
        }),
      },
      () => {
        console.log('handlePause', this.state.videos);
      },
    );
  };

  handelAllPause = (navigation) => {
    this.setState(
      {
        videos: this.state.videos.map((item) => {
          return {
            ...item,
            paused: true,
          };
        }),
      },
      () => {
        this.props.navigation.navigate(navigation);
      },
    );
  };

  handleShare = async (id) => {
    if (this.props.token) {
      try {
        // let options = {
        //   title: 'Challenge IT',
        //   message: 'Hello',
        // };
        // const shareRes = await Share.open(options);
        // console.log(res);
        this.setState(
          {
            videos: this.state.videos.map((item) => {
              if (item.challenge_id === id)
                return {
                  ...item,
                  shares: parseInt(item.shares) + 1,
                };
              return item;
            }),
          },
          () => {
            const params = new FormData();
            params.append('challenge_id', id);
            new Promise((rsl, rej) => {
              this.props.addShare(this.props.token, params, rsl, rej);
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {});
          },
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      // alert('Kindly login first');
      Snackbar.show({
        text: 'Kindly Login first',
        backgroundColor: primaryColor,
      });
      this.setState(
        {
          videos: this.state.videos.map((item) => {
            return {
              ...item,
              paused: true,
            };
            // return item;
          }),
        },
        () => {
          this.props.navigation.navigate('Signin');
        },
      );
    }
  };
  addToPlayList = (id) => {
    if (this.props.token) {
      this.setState({
        challangeId: id,
      });
      Snackbar.show({
        text: ' Saved to playlist',
        duration: Snackbar.LENGTH_LONG,
        action: {
          text: 'Change',
          textColor: primaryColor,
          onPress: () => {
            this.playListRef.open();
          },
        },
      });
    } else {
      // alert('Kindly login first');
      Snackbar.show({
        text: 'Kindly Login first',
        backgroundColor: primaryColor,
      });
      this.setState(
        {
          videos: this.state.videos.map((item) => {
            return {
              ...item,
              paused: true,
            };
            // return item;
          }),
        },
        () => {
          this.props.navigation.navigate('Signin');
        },
      );
    }
  };
  toggleLike = (id) => {
    if (this.props.token) {
      this.setState(
        {
          videos: this.state.videos.map((item) => {
            if (item.challenge_id === id)
              return {
                ...item,
                liked: !item.liked,
                claps:
                  item.liked == true
                    ? parseInt(item.claps) - 1
                    : parseInt(item.claps) + 1,
              };
            return item;
          }),
        },
        () => {
          const formData = new FormData();
          formData.append('challenge_id', id);
          new Promise((rsl, rej) => {
            this.props.addClap(this.props.token, formData, rsl, rej);
          })
            .then(() => {})
            .catch((err) => {});
          //clap api wiil be called
        },
      );
    } else {
      Snackbar.show({
        text: 'Kindly Login first',
        backgroundColor: primaryColor,
      });
      this.setState(
        {
          videos: this.state.videos.map((item) => {
            return {
              ...item,
              paused: true,
            };
            // return item;
          }),
        },
        () => {
          this.props.navigation.navigate('Signin');
        },
      );
    }
  };
  download = async () => {
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
        } else {
          Alert.alert(
            'ChallengeIt',
            'Please allow all permission',
            // [
            //   {
            //     text: 'OPEN SETTINGS',
            //     onPress: () => Linking.openSettings(),
            //   },
            // ]
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  actualDownload = (vid, id) => {
    if (this.props.token) {
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${
        (Math.random() * 1000) | 0
      }.mp4`;
      const formUrl = vid;

      const options = {
        fromUrl: formUrl,
        toFile: downloadDest,
        background: true,
        begin: (res) => {
          console.log('begin', res);
          console.log('contentLength:', res.contentLength / 1024 / 1024, 'M');
          Snackbar.show({
            text: 'Video is  downloading',
            backgroundColor: primaryColor,
          });
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
                Snackbar.show({
                  text: 'Video has been downloaded',
                  backgroundColor: primaryColor,
                });
                this.setState(
                  {
                    videos: this.state.videos.map((item) => {
                      if (item.challenge_id === id)
                        return {
                          ...item,
                          downloads: parseInt(item.downloads) + 1,
                        };
                      return item;
                    }),
                  },
                  () => {
                    const params = new FormData();
                    params.append('challenge_id', id);
                    new Promise((rsl, rej) => {
                      this.props.addDownload(
                        this.props.token,
                        params,
                        rsl,
                        rej,
                      );
                    })
                      .then((res) => {})
                      .catch((err) => {});
                  },
                );
              })
              .catch(() => {
                Snackbar.show({
                  text: 'Somthing bad happened',
                });
              });
          })
          .catch((err) => {
            console.log('err', err);
          });
      } catch (e) {
        console.log(error);
      }
    } else {
      // alert('Kindly login first');
      Snackbar.show({
        text: 'Kindly Login first',
        backgroundColor: primaryColor,
      });
      this.setState(
        {
          videos: this.state.videos.map((item) => {
            return {
              ...item,
              paused: true,
            };
            // return item;
          }),
        },
        () => {
          this.props.navigation.navigate('Signin');
        },
      );
    }
  };
  //handle play pause
  handlePlayPause = (id) => {
    this.setState(
      {
        videos: this.state.videos.map((item) => {
          if (item.challenge_id === id)
            return {
              ...item,
              paused: !item.paused,
            };
          return item;
        }),
      },
      () => {
        console.log('handlePlayPause', this.state.videos);
      },
    );
  };
  handleVideoLoading = (id) => {
    this.setState({
      videos: this.state.videos.map((item) => {
        item.loading = true;
        if (item.challenge_id == id)
          return {
            ...item,
            loading: !item.loading,
          };
        return item;
      }),
    });
  };

  showThubmnail = (thumb) => {
    return (
      <Image
        resizeMode={'cover'}
        source={{uri: `${BASE_URL}${thumb}`}}
        style={styles.thumbnail}
      />
    );
  };
  handleCheckPress = (id) => {
    this.setState({
      playlists: this.state.playlists.map((item) => {
        if (item.playlist_id === id)
          return {
            ...item,
            checked: !item.checked,
          };
        return item;
      }),
    });
  };

  renderPlayList = ({item, index}) => {
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          activeOpacity={0.7}
          key={index}
          onPress={() => {
            this.handleCheckPress(item.playlist_id);
          }}
          style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
          <CheckBox
            onPress={() => {
              this.handleCheckPress(item.playlist_id);
            }}
            center
            checked={item.checked}
            checkedColor="red"
            containerStyle={{padding: 0}}
          />
          <Text
            style={[
              styles.mediumText,
              {alignSelf: 'center', fontSize: 18, margin: 5},
            ]}>
            {item.playlist_name}
          </Text>
        </TouchableOpacity>
        <Divider style={styles.dividerStyle} />
      </View>
    );
  };
  handleNewPlaylist = () => {
    if (this.state.playlistName === '') {
      Snackbar.show({
        text: 'Kindly enter playlist name',
        backgroundColor: primaryColor,
      });
    } else {
      const params = new FormData();
      params.append('name', this.state.playlistName);
      new Promise((rsl, rej) => {
        this.setState({loading: true});
        this.props.addPlaylist(this.props.token, params, rsl, rej);
      })
        .then((res) => {
          this.setState({
            playlists: res.data,
            loading: false,
            add: !this.state.add,
          });
        })
        .catch((err) => {
          this.setState({
            loading: false,
          });
        });
    }
  };
  addVidPlayList = () => {
    const {playlists} = this.state;
    const filtered =
      playlists &&
      playlists.filter((item) => {
        return item.checked == true;
      });
    const formData = new FormData();

    if (filtered.length > 0) {
      filtered.map((item) => {
        formData.append('playlist_id[]', item.playlist_id);
      });
      formData.append('challenge_id', this.state.challangeId);

      console.log(formData);
      new Promise((rsl, rej) => {
        this.props.vidToPlaylist(this.props.token, formData, rsl, rej);
      })
        .then((res) => {
          setTimeout(() => {
            Snackbar.show({
              text: res,
              backgroundColor: primaryColor,
            });
          }, 3000);

          this.playListRef.close();
        })
        .catch((err) => {
          setTimeout(() => {
            Snackbar.show({
              text: err,
              backgroundColor: primaryColor,
            });
          }, 3000);

          this.playListRef.close();
        });
    } else {
      Snackbar.show({
        text: 'Kindly selecte at least one playlist',
        backgroundColor: primaryColor,
      });
    }
  };
  handleReport = () => {
    const {nudity, cheat, voilence, other, challangeId} = this.state;
    if (!nudity && !cheat && !voilence && !other) {
      Snackbar.show({
        text: 'Kindly select at least 1 reason',
        backgroundColor: primaryColor,
      });
    } else if (this.state.note === '') {
      Snackbar.show({
        text: 'Kindly write the reason',
        backgroundColor: primaryColor,
      });
    } else {
      const formData = new FormData();
      nudity && formData.append('reasons[]', 'nudity');
      cheat && formData.append('reasons[]', 'cheat');
      voilence && formData.append('reasons[]', 'violence');
      other && formData.append('reasons[]', 'other');
      formData.append('challenge_id', challangeId);
      formData.append('note', this.state.note);
      console.log(formData);
      new Promise((rsl, rej) => {
        this.props.reportVideo(this.props.token, formData, rsl, rej);
      })
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            Snackbar.show({
              text: err,
              backgroundColor: primaryColor,
            });
          }, 3000);
          this.reportRef.close();
        })
        .catch((err) => {
          setTimeout(() => {
            Snackbar.show({
              text: err,
              backgroundColor: primaryColor,
            });
          });
        }, 3000);
      this.reportRef.close();
    }
  };
  render() {
    const {nudity, cheat, other, voilence} = this.state;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ViewPager
          orientation="vertical"
          initialPage={0}
          style={{flex: 1, backgroundColor: 'black'}}
          onPageSelected={(e) => {
            console.log(e);
            this.handlePause(e.nativeEvent.position);
          }}>
          {this.state.videos.map((item, i) => {
            return (
              <DoubleTap
                key={i}
                style={{flex: 1}}
                // singleTap={() => {
                //   this.handlePlayPause(item.challenge_id);
                // }}
                doubleTap={() => {
                  this.toggleLike(item.challenge_id);
                }}
                delay={200}>
                <TouchableWithoutFeedback
                  style={{flex: 1}}
                  onPress={() => {
                    this.handlePlayPause(item.challenge_id);
                  }}>
                  <Video
                    ref={(ref) => {
                      this.video = ref;
                    }}
                    poster={`${BASE_URL}${item.thumbnail}`}
                    resizeMode="cover"
                    source={{
                      uri: item.file,
                    }}
                    style={styles.mediaPlayer}
                    volume={0.4}
                    paused={item.paused}
                    onReadyForDisplay={() => {
                      this.handleVideoLoading(item.challenge_id);
                    }}
                    posterResizeMode={'cover'}
                  />
                </TouchableWithoutFeedback>
                <View
                  style={{
                    position: 'absolute',
                    height: height / 2.5,
                    width: width / 8,
                    bottom: height / 6,
                    left: width - 60,

                    justifyContent: 'space-between',
                    // alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: (height / 2.8) * 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons
                      name="checkmark-circle"
                      color="white"
                      size={25}
                      style={{color: '#4cc76c', alignSelf: 'center'}}
                    />
                  </View>
                  <View
                    style={{
                      width: '100%',
                      height: (height / 2.8) * 0.1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      // marginTop: 4,
                    }}>
                    <OptionsMenu
                      customButton={
                        <Entypo
                          name="dots-three-horizontal"
                          style={{
                            fontSize: 25,
                            color: 'white',
                            // marginVertical: 4,
                            alignSelf: 'center',
                            // marginRight: 10,
                          }}
                        />
                      }
                      options={['Add to playlist', 'Report Video']}
                      actions={[
                        () => this.addToPlayList(item.challenge_id),
                        () =>
                          this.setState(
                            {challangeId: item.challenge_id},
                            () => {
                              this.reportRef.open();
                            },
                          ),
                        // () => alert('Video Reported'),
                      ]}
                    />
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: (height / 2.8) * 0.14,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      // marginTop: 4,
                    }}>
                    <TouchableOpacity>
                      <Entypo
                        name="eye"
                        size={25}
                        style={{
                          color: 'white',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: Fonts.CenturyBold,
                        alignSelf: 'center',
                      }}>
                      {item.views}
                    </Text>
                  </View>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.toggleLike(item.challenge_id);
                    }}>
                    <View
                      style={{
                        width: '100%',
                        height: (height / 2.8) * 0.18,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginTop: 4,
                      }}>
                      {item.liked ? (
                        <LottieView
                          source={require('../../utils/clap.json')}
                          style={{
                            height: 35,
                            width: 35,
                            // marginRight: item.liked ? 9 : 0,
                            overflow: 'hidden',
                          }}
                          autoPlay
                          loop
                        />
                      ) : (
                        <Image
                          resizeMode="contain"
                          source={require('../../assets/images/clap.png')}
                          style={{
                            tintColor: item.liked ? primaryColor : 'white',
                            height: 25,
                            width: 25,
                          }}
                        />
                      )}

                      <Text
                        style={{
                          fontSize: 12,

                          color: 'white',
                          fontFamily: Fonts.CenturyBold,
                        }}>
                        {item.claps}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>

                  <View
                    style={{
                      width: '100%',
                      height: (height / 2.8) * 0.18,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginTop: 4,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.actualDownload(item.file, item.challenge_id)
                      }>
                      <MaterialCommunityIcons
                        name="download"
                        style={{
                          fontSize: 30,
                          color: 'white',
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'white',
                        fontFamily: Fonts.CenturyBold,
                      }}>
                      {item.downloads}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: '100%',
                      height: (height / 2.8) * 0.18,
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      marginTop: 4,
                    }}>
                    <Entypo
                      name="forward"
                      style={{fontSize: 30, color: 'white'}}
                      onPress={() => {
                        this.handleShare(item.challenge_id);
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,

                        color: 'white',
                        fontFamily: Fonts.CenturyBold,
                        textAlign: 'center',
                      }}>
                      {item.shares}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    position: 'absolute',
                    bottom: height / 30,
                    // backgroundColor: 'tomato',
                    left: 0,
                    // width: '80%',
                  }}>
                  <Text
                    onPress={() => {
                      console.log('hi');
                      this.setState(
                        {
                          videos: this.state.videos.map((item) => {
                            return {
                              ...item,
                              paused: true,
                            };
                          }),
                        },
                        () => {
                          console.log(this.state.videos);
                          this.props.navigation.navigate('User', {
                            uid: item.u_id,
                          });
                        },
                      );
                    }}
                    style={{
                      color: 'white',
                      fontSize: width / 22,
                      fontFamily: Fonts.CenturyBold,
                      marginLeft: 13,
                    }}>
                    {'@ ' + item.f_name + ' ' + item.l_name}
                  </Text>
                  <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => {
                      this.setState(
                        {
                          videos: this.state.videos.map((item) => {
                            return {
                              ...item,
                              paused: true,
                            };
                          }),
                        },
                        () => {
                          console.log(this.state.videos);
                          this.props.navigation.navigate('Hashtag', {
                            hashtag: item.challengename,
                          });
                        },
                      );
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: Fonts.CenturyRegular,
                        fontSize: width / 30,
                        marginLeft: 7,
                      }}>
                      {'#' + item.challengename}
                    </Text>
                  </TouchableOpacity>
                </View>
                {item.loading && (
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
                )}
                {item.show_back_btn && (
                  <View
                    style={{
                      position: 'absolute',
                      top: height / 18,
                      right: width - width / 10,
                    }}>
                    <AntDesign
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                      name="arrowleft"
                      style={{
                        fontSize: 26,
                        color: 'black',
                      }}
                    />
                  </View>
                )}
                {item.response_of !== 1 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: height / 6,
                      left: width - width / 5.2,
                    }}>
                    <View
                      style={{
                        top: 1,
                        left: width / 13.71428,
                        position: 'absolute',
                        width: width,
                        height: width / 8.4,
                        backgroundColor: primaryColor,
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState(
                          {
                            videos: this.state.videos.map((item) => {
                              return {
                                ...item,
                                paused: true,
                              };
                            }),
                          },
                          () => {
                            console.log(this.state.videos);
                            this.props.navigation.navigate('ProfileScreen', {
                              challenge_id: item.challenge_id,
                            });
                          },
                        );
                      }}>
                      <Image
                        source={require('../../assets/images/samplechallenger.jpg')}
                        style={{
                          borderRadius: 30,
                          borderWidth: width / 205.714,
                          height: width / 8,
                          width: width / 8,
                          borderColor: 'white',
                        }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </DoubleTap>
            );
          })}
        </ViewPager>

        <RBSheet
          ref={(ref) => {
            this.reportRef = ref;
          }}
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
            activeOpacity={1}
            onPress={() => {
              this.setState({nudity: !nudity});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={nudity}
              checkedColor="red"
              onPress={() => {
                this.setState({nudity: !nudity});
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
            activeOpacity={1}
            onPress={() => {
              this.setState({voilence: !voilence});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={voilence}
              checkedColor="red"
              onPress={() => {
                this.setState({voilence: !voilence});
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
            activeOpacity={1}
            onPress={() => {
              this.setState({cheat: !cheat});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={cheat}
              checkedColor="red"
              onPress={() => {
                this.setState({cheat: !cheat});
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
            activeOpacity={1}
            onPress={() => {
              this.setState({other: !other});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={other}
              checkedColor="red"
              onPress={() => {
                this.setState({other: !other});
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
            maxLength={120}
            onChangeText={(note) => {
              this.setState({note});
            }}
            placeholder={'write your message'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.smallButton}
            onPress={() => {
              this.handleReport();
            }}>
            <Text
              style={[styles.largeText, {color: 'white', alignSelf: 'center'}]}>
              Report
            </Text>
          </TouchableOpacity>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.playListRef = ref;
          }}
          height={620}
          openDuration={250}
          customStyles={{
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              // paddingTop: 10,
              paddingBottom: 10,
            },
          }}>
          <FlatList
            style={{
              flex: 1,
              marginTop: '10%',
              padding: 5,
            }}
            data={this.state.playlists}
            extraData={this.state}
            keyExtractor={(item) => item}
            renderItem={this.renderPlayList}
            ListFooterComponent={
              <View>
                {this.state.add && (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      padding: 10,
                      marginLeft: 14,
                    }}>
                    <TextInput
                      onChangeText={(playlistName) => {
                        this.setState({playlistName});
                      }}
                      maxLength={20}
                      style={{
                        width: '70%',
                        borderBottomWidth: 1,
                        borderBottomColor: 'gray',
                      }}
                      placeholder={'Kindly enter playlist name'}
                    />
                    {this.state.playlistName.length > 3 && (
                      <TouchableOpacity
                        style={[
                          styles.smallButton,
                          {
                            padding: 5,
                            width: '20%',
                            alignSelf: 'center',
                            marginTop: 5,
                          },
                        ]}
                        onPress={() => {
                          this.handleNewPlaylist();
                        }}>
                        {this.state.loading ? (
                          <ActivityIndicator animating color="white" />
                        ) : (
                          <Text
                            style={[
                              styles.largeText,
                              {color: 'white', alignSelf: 'center'},
                            ]}>
                            Add
                          </Text>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                )}
                {
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.smallButton, {marginVertical: 10}]}
                    onPress={() => {
                      this.addVidPlayList();
                    }}>
                    <Text
                      style={[
                        styles.largeText,
                        {color: 'white', alignSelf: 'center'},
                      ]}>
                      Save
                    </Text>
                  </TouchableOpacity>
                }
              </View>
            }
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({add: !this.state.add});
            }}
            style={{
              height: 50,
              width: 50,
              borderRadius: 35,
              backgroundColor: primaryColor,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              margin: 10,
            }}>
            <Ionicons color="white" size={25} name="add-outline" />
          </TouchableOpacity>
        </RBSheet>
      </SafeAreaView>
    );
  }
}
export const Loading = ({visible}) => (
  <ActivityIndicator
    animating
    color={primaryColor}
    style={visible ? styles.centering : styles.hideIndicator}
    size="large"
  />
);
const mapStateToProps = (state) => {
  const {allchallenges, playlists} = state.app;
  const {token, user} = state.auth;
  return {token, user, allchallenges, playlists};
};
export default connect(mapStateToProps, {
  getChallenges,
  getPlayLists,
  addClap,
  addDownload,
  addShare,
  addPlaylist,
  vidToPlaylist,
  reportVideo,
})(Feed);
