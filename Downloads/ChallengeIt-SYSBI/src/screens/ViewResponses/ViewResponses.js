import React, {Component} from 'react';
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
  ActivityIndicator,
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
import {more, dummy, clap, viewResponse, respond} from '../../assets';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {primaryColor} from '../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {CheckBox, Avatar, Badge, Header} from 'react-native-elements';
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
import Camera from '../Camera';
import {BASE_URL} from '../../redux/base-url';
import {Loading} from '../../components/Loading';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from 'react-native-geolocation-service';
//redux
import {connect} from 'react-redux';
import {
  seeFullThread,
  addPlaylist,
  vidToPlaylist,
} from '../../redux/actions/app';
import {color} from 'react-native-reanimated';

class Chellenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      singleUser: null,
      showAvatar: false,
      searchWidth: new Animated.Value(0),
      searchState: false,
      reportMsg: '',
      challangeId: '',
      type: 'Recent',
      nudity: false,
      cheat: false,
      voilence: false,
      other: false,
      bilal: false,
      myFav: false,
      best: false,
      playlists: [],
      daring: false,
      add: false,
      playlistName: '',

      buttons: [
        {id: 0, name: 'Recent', isActive: true},
        {id: 1, name: 'Challengers of the week', isActive: false},
        {id: 2, name: 'Challenges of the week', isActive: false},
      ],
      videos: [],
    };
  }
  componentDidMount = () => {
    {
      this.props.token &&
        this.setState({
          playlists: this.props.playlists.map((item) => {
            return {
              ...item,
              checked: false,
            };
          }),
        });
      this.grabChallenges();
    }
  };
  handleItemPress = (id) => {
    this.setState(
      {
        buttons: this.state.buttons.map((item) => {
          item.isActive = false;
          if (item.id === id)
            return {
              ...item,
              isActive: !item.isActive,
            };
          return item;
        }),
      },
      () => {
        this.grabChallenges();
      },
    );
  };

  grabChallenges = () => {
    const id = this.props.route.params && this.props.route.params.id;
    const params = new FormData();
    params.append('full_thread', id);
    this.setState({loading: true});
    new Promise((rsl, rej) => {
      this.props.seeFullThread(this.props.token, params, rsl, rej);
    })
      .then((res) => {
        this.props.fullThread &&
          this.setState({
            videos: this.props.fullThread.map((item) => {
              return {
                ...item,
                loading: true,
                muted: false,
                paused: true,
              };
            }),
          });

        this.setState({loading: false});
        console.log(res);
      })
      .catch((err) => {
        Snackbar.show({
          text: err,
          backgroundColor: primaryColor,
        });
        this.setState({loading: false});
      });
  };
  animationToggle = () => {
    if (!this.state.searchState) {
      Animated.timing(this.state.searchWidth, {
        toValue: width / 1.5,
        timing: 15000,
      }).start(() => {
        this.setState({
          searchState: true,
        });
      });
    } else {
      Animated.timing(this.state.searchWidth, {
        toValue: 0,
        timing: 15000,
      }).start(() => {
        this.setState({
          searchState: false,
        });
      });
    }
  };

  handleShare = async () => {
    if (this.props.token) {
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
    } else {
      Snackbar.show({
        text: 'Kindly login first',
        backgroundColor: primaryColor,
      });
      this.props.navigation.navigate('Signin');
    }
  };

  handlePause = (i) => {
    this.setState({
      videos: this.state.videos.map((item) => {
        if (item.challenge_id === i)
          return {
            ...item,
            paused: !item.paused,
          };

        return item;
      }),
    });
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
          Snackbar.show({
            text: res,
            backgroundColor: primaryColor,
          });
          this.playListRef.close();
        })
        .catch((err) => {
          Snackbar.show({
            text: 'Something Bad Happened',
            backgroundColor: primaryColor,
          });
          // this.playListRef.close();
        });
      console.log(filtered);
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
    } else {
      Snackbar.show({
        text: 'Reported Successfully',
        backgroundColor: primaryColor,
      });

      const formData = new FormData();
      nudity && formData.append('reason[]', 'nudity');
      cheat && formData.append('reason[]', 'cheat');
      voilence && formData.append('reason[]', 'violence');
      other && formData.append('reason[]', 'other');
      formData.append('challenge_id', challangeId);

      new Promise((rsl, rej) => {
        this.props.reportVideo(this.props.token, formData, rsl, rej);
      })
        .then((res) => {
          console.log(res);
          Snackbar.show({
            text: res,
            backgroundColor: primary,
          });
          this.reportRef.close();
        })
        .catch((err) => {
          Snackbar.show({
            text: err,
            backgroundColor: primaryColor,
          });
        });
    }
  };

  renderPosts = ({item, index}) => {
    console.log(`${index}----->`, item);
    return (
      <View key={index} activeOpacity={0.9} style={[styles.cardStyle]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginHorizontal: 5,
          }}>
          <Image
            source={{uri: `${BASE_URL}${item.dp}`}}
            style={styles.userImgStyle}
          />

          <View
            style={{
              marginTop: 7,
              width: '80%',
            }}>
            <Text
              onPress={() => {
                this.setState(
                  {
                    singleUser: null,
                    videos: this.state.videos.map((item) => {
                      return {
                        ...item,
                        paused: true,
                      };
                    }),
                  },
                  () => {
                    this.props.navigation.navigate('User', {
                      uid: item.u_id,
                    });
                  },
                );
              }}
              style={[
                {
                  color: primaryColor,
                  fontSize: 16,
                  fontFamily: Fonts.CenturyRegular,
                  alignSelf: 'flex-start',
                  width: '100%',
                },
              ]}>
              {item.f_name}{' '}
              <Text
                style={[
                  {
                    fontSize: 12,
                    color: '#212121',
                    fontFamily: Fonts.CenturyRegular,
                  },
                ]}>
                {item.l_name === '' ? 'posted a Challenge at' : 'Challenged'}{' '}
                {item.l_name === '' && (
                  <Text
                    onPress={() => {}}
                    style={{
                      fontSize: 13,
                      fontFamily: Fonts.CenturyRegular,
                      color: 'skyblue',
                    }}>
                    {/* Giga Mall,DHA Phase 2{'   '} */}
                  </Text>
                )}
              </Text>{' '}
              <Text
                style={[
                  {
                    color: primaryColor,
                    fontSize: 16,
                    fontFamily: Fonts.CenturyRegular,
                    marginBottom: 4,
                  },
                ]}>
                {item.l_name === '' ? `\n` : `${item.l_name}`}
                {item.l_name !== '' && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#212121',
                      fontFamily: Fonts.CenturyRegular,
                    }}>
                    {' '}
                    at
                  </Text>
                )}
                {item.to !== '' && (
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Fonts.CenturyRegular,
                      color: 'skyblue',
                    }}>
                    {' '}
                    Giga Mall,DHA Phase 2{'   \n'}
                  </Text>
                )}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontFamily: Fonts.CenturyRegular,
                    color: 'gray',
                  }}>
                  {item.away}
                  {'   '} {item.post_date}
                </Text>
              </View>
            </Text>
          </View>

          <TouchableOpacity
            style={{
              height: 27,
              width: 20,
            }}
            onPress={() =>
              this.setState(
                {
                  challangeId: item.challenge_id,
                },
                () => {
                  this.optionSheet.open();
                },
              )
            }>
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
              fontSize: 14,
              color: primaryColor,
              alignSelf: 'flex-start',
              margin: 4,
            },
          ]}
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
                this.props.navigation.navigate('Hashtag', {
                  hashtag: item.challengename,
                });
              },
            );
            // handleVideoPause(item.challenge_id);
          }}>
          #{item.challengename}
        </Text>
        <View style={[styles.horizontalContainer]}></View>
        <View>
          <DoubleTap
            singleTap={() => {
              this.handlePause(item.challenge_id);
            }}
            doubleTap={() => {
              this.toggleLike(item.challenge_id);
            }}
            delay={200}>
            <Video
              source={{uri: item.file}}
              paused={item.paused}
              resizeMode="cover"
              // repeat
              muted={item.muted}
              style={{
                height: height / 1.6,
                width: '100%',
                backgroundColor: 'black',
              }}
              onReadyForDisplay={() => {
                this.handleVideoLoading(item.challenge_id);
              }}
            />
          </DoubleTap>
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
          <View
            style={{
              width: '100%',
              position: 'absolute',
              bottom: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: height / 20,

                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 7,
                alignSelf: 'center',
                // width: 45,
              }}>
              <AntDesign
                name="eyeo"
                size={25}
                style={{marginRight: 7, color: 'white'}}
              />
              <Text
                style={[
                  styles.smallText,
                  {
                    marginTop: -3,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 14,
                  },
                ]}>
                {item.views}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                this.handleVideoMute(item.challenge_id);
              }}
              style={[
                {
                  height: 25,
                  width: 25,
                  borderRadius: 12.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  padding: 2,
                  marginRight: 7,
                },
              ]}>
              <Ionicons
                name={item.muted ? 'volume-mute' : 'volume-high'}
                color="white"
                size={20}
              />
            </TouchableOpacity>
          </View>

          {item.paused && (
            <Entypo
              name="controller-play"
              color="white"
              style={[styles.playButton]}
              onPress={() => {
                this.handlePause(item.challenge_id);
              }}
            />
          )}
        </View>
        {/* <Text
          style={[
            styles.mediumText,
            {
              fontSize: 14,
              alignSelf: 'flex-end',
              marginVertical: 5,
              marginRight: 5,
              fontFamily: Fonts.CenturyRegular,
              color: primaryColor,
            },
          ]}
          onPress={() => {
            // setsingleUser(null);
            this.setState(
              {
                singleUser: null,
                videos: this.state.videos.map((item) => {
                  return {
                    ...item,
                    paused: true,
                  };
                }),
              },
              () => {
                this.props.navigation.navigate('ViewRes');
              },
            );
            // handleVideoPause(item.challenge_id);
          }}>
          See Full Thread
        </Text> */}

        <View
          style={[
            styles.horizontalContainer,
            {
              // justifyContent: 'space-between',
              // padding: 10,
              flex: 1,
            },
          ]}>
          <View style={{flex: 0.25}}>
            <TouchableWithoutFeedback
              onPress={() => this.toggleLike(item.challenge_id)}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  // paddingVertical: 5,

                  marginBottom: item.liked ? 4 : 0,
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
                    autoPlay
                    loop
                  />
                ) : (
                  <Image
                    resizeMode={'contain'}
                    source={clap}
                    style={{
                      height: 25,
                      width: 25,
                      // marginLeft: item.liked ? 0 : 15,
                    }}
                  />
                )}
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: 8,
                  }}>
                  <Text
                    style={[
                      styles.smallText,
                      {
                        color: '#212121',
                        // marginLeft: 5,
                        marginTop: item.liked ? 0 : 1,
                        // marginBottom: item.liked ? 3 : 0,
                      },
                    ]}>
                    {item.claps}
                    {' claps '}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      singleUser: null,
                      videos: this.state.videos.map((item) => {
                        return {
                          ...item,
                          paused: true,
                        };
                      }),
                    },
                    async () => {
                      this.props.navigation.navigate('Feed', {
                        from: 'yes',
                        challenge_id: item.challenge_id,
                      });
                    },
                  );
                }}
                activeOpacity={0.5}>
                <Image
                  resizeMode={'contain'}
                  source={viewResponse}
                  style={{
                    height: 22,
                    width: 22,
                    alignSelf: 'center',
                    // marginLeft: item.liked ? 0 : 15,
                  }}
                />
              </TouchableOpacity>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.smallText,
                    {alignSelf: 'center', opacity: 0.7, color: '#212121'},
                  ]}>
                  {item.views}
                  {' responses '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      singleUser: null,
                      videos: this.state.videos.map((item) => {
                        return {
                          ...item,
                          paused: true,
                        };
                      }),
                    },
                    () => {
                      if (this.props.tokne) {
                        this.props.navigation.navigate('Camera');
                      } else {
                        Snackbar.show({
                          text: 'Kindly login first',
                          backgroundColor: primaryColor,
                        });
                        this.props.navigation.navigate('Signin');
                      }
                    },
                  );
                }}
                activeOpacity={0.5}>
                <Image
                  resizeMode={'contain'}
                  source={respond}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'center',
                    // tintColor: '#212121',
                    // marginLeft: item.liked ? 0 : 15,
                  }}
                />
              </TouchableOpacity>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.smallText,
                    {alignSelf: 'center', opacity: 0.7, color: '#212121'},
                  ]}>
                  Accept
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flex: 0.25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState(
                    {
                      singleUser: null,
                      videos: this.state.videos.map((item) => {
                        return {
                          ...item,
                          paused: true,
                        };
                      }),
                    },
                    () => {
                      this.handleShare();
                    },
                  );
                }}
                activeOpacity={0.5}>
                <Entypo
                  name="forward"
                  size={25}
                  style={{
                    color: item.isShared ? primaryColor : '#212121',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>

              <View style={{flexDirection: 'row'}}>
                <Text
                  style={[
                    styles.smallText,
                    {
                      alignSelf: 'center',
                      opacity: 0.7,
                      color: '#212121',
                      marginBottom: 5,
                    },
                  ]}>
                  {item.shares}
                  {' shares'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  handleVideoMute = (id) => {
    this.setState({
      videos: this.state.videos.map((item) => {
        if (item.challenge_id === id)
          return {
            ...item,
            muted: !item.muted,
          };
        return item;
      }),
    });
  };

  onViewableItemsChanged = (viewableItmes) => {
    console.log('id', viewableItmes);
    if (viewableItmes.viewableItems.length > 0) {
      this.setState({
        videos: this.state.videos.map((item) => {
          item.paused = true;
          if (item.challenge_id === viewableItmes.changed[0].item.challenge_id)
            return {
              ...item,
              paused: !item.paused,
            };
          return item;
        }),
      });
    }
  };

  viewConfigRef = {
    itemVisiblePercentThreshold: 200,
    minimumViewTime: 5,
    waitForInteraction: true,
  };

  handleVideoLoading = (id) => {
    this.setState({
      videos: this.state.videos.map((item) => {
        item.loading = true;
        if (item.challenge_id === id)
          return {
            ...item,
            loading: !item.loading,
          };
        return item;
      }),
    });
  };
  toggleLike = (id) => {
    if (this.props.token) {
      this.setState({
        videos: this.state.videos.map((item) => {
          if (item.challenge_id == id)
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
      });
    } else {
      Snackbar.show({
        text: 'Kindly login first',
        backgroundColor: primaryColor,
      });
      this.props.navigation.navigate('Signin');
    }
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
  handleHideVideo = () => {
    let vids = [...this.state.videos];
    const filtered = vids.filter((item) => {
      return item.challenge_id !== this.state.challangeId;
    });
    this.setState(
      {
        videos: filtered,
      },
      () => {
        this.optionSheet.close();
      },
    );
    Snackbar.show({
      text: 'Hided successfully',
      backgroundColor: primaryColor,
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
  render() {
    const {
      nudity,
      cheat,
      voilence,
      other,
      bilal,
      best,
      myFav,
      daring,
      singleUser,
    } = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <Header
          backgroundColor={primaryColor}
          leftComponent={
            <AntDesign
              onPress={() => {
                this.props.navigation.goBack();
              }}
              name="arrowleft"
              style={{
                fontSize: 26,
                color: 'white',
              }}
            />
          }
        />
        {this.state.loading ? (
          <ChallengePlaceholder />
        ) : (
          <FlatList
            data={this.state.videos}
            extraData={this.state}
            keyExtractor={(item, index) => item + index.toString()}
            renderItem={this.renderPosts}
            onViewableItemsChanged={this.onViewableItemsChanged}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 90,
            }}
          />
        )}

        <RBSheet
          ref={(ref) => {
            this.optionSheet = ref;
          }}
          height={360}
          openDuration={250}
          customStyles={{
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: 20,
            },
          }}>
          {this.props.token && (
            <View>
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
                        this.optionSheet.close();
                        this.playListRef.open();
                      },
                    },
                  });
                }}
                style={[
                  styles.horizontalContainer,
                  {marginLeft: 4, padding: 10},
                ]}>
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
            </View>
          )}
          <TouchableOpacity
            onPress={() => {
              Snackbar.show({
                text: 'Saved to your device',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: primaryColor,
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
              this.handleHideVideo();
              // Snackbar.show({
              //   text: 'Hide',
              //   duration: Snackbar.LENGTH_SHORT,
              // });
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
                backgroundColor: primaryColor,
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
          {this.props.token && (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.reportRef.open();
                  this.optionSheet.close();
                }}
                style={[
                  styles.horizontalContainer,
                  {marginLeft: 4, padding: 10},
                ]}>
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
            </View>
          )}
        </RBSheet>

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
            onPress={() => {
              this.setState({nudity: !this.state.nudity});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={nudity}
              checkedColor="red"
              onPress={() => {
                this.setState({nudity: !this.state.nudity});
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
              this.setState({voilence: !this.state.voilence});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={voilence}
              checkedColor="red"
              onPress={() => {
                this.setState({voilence: !this.state.voilence});
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
              this.setState({cheat: !this.state.cheat});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={cheat}
              checkedColor="red"
              onPress={() => {
                this.setState({cheat: !this.state.cheat});
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
              this.setState({other: !this.state.other});
            }}
            style={[styles.horizontalContainer, {marginLeft: 14, padding: 10}]}>
            <CheckBox
              center
              checked={other}
              checkedColor="red"
              onPress={() => {
                this.setState({other: !this.state.other});
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
              this.setState({
                reportMsg: e,
              });
            }}
            defaultValue={this.state.reportMsg}
            maxLength={120}
            placeholder={'write your message'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
          />

          <TouchableOpacity
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
          height={520}
          openDuration={250}
          customStyles={{
            container: {
              borderTopRightRadius: 30,
              borderTopLeftRadius: 30,
              paddingTop: 10,
            },
          }}>
          <FlatList
            style={{
              flex: 1,
              marginTop: '10%',
              padding: 10,
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
                          // alert('added');
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
                <TouchableOpacity
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
const mapStateToProps = (state) => {
  const {fullThread, playlists} = state.app;
  const {token, user} = state.auth;
  return {token, user, fullThread, playlists};
};
export default connect(mapStateToProps, {
  seeFullThread,
  addPlaylist,
  vidToPlaylist,
})(Chellenges);
