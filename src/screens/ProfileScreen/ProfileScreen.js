import React, {useEffect, useState, useRef} from 'react';
import {
  ScrollView,
  View,
  Text,
  Dimensions,
  Image,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';
import Share from 'react-native-share';
import {Header} from 'react-native-elements';
import {more, dummy, clap} from '../../assets';
import {Fonts} from '../../utils/Fonts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import OptionsMenu from 'react-native-options-menu';
import Snackbar from 'react-native-snackbar';
import RBSheet from 'react-native-raw-bottom-sheet';
import LottieView from 'lottie-react-native';
import TabBar from '../../components/navigation';
import styles from './styles';
import {primaryColor} from '../../components/colors';
import DoubleTap from '../../components/DoubleTap';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({navigation}) => {
  const playListRef = useRef(null);
  const [followState, setFollowState] = useState('follow');
  const [responses, setResponses] = useState(0);
  const [applauses, setApplauses] = useState(0);
  const [shares, setShares] = useState(0);
  const [views, setViews] = useState(0);
  const [totalChallenges, setTotalChallenges] = useState(0);
  const [acceptedChallenges, setAcceptedChallenges] = useState(0);
  const [liked, setLiked] = useState(false);
  const [sharing, setSharing] = useState(false);
  const {width, height} = Dimensions.get('window');
  const [muted, setMuted] = useState(false);
  const [singlePaused, setsinglePaused] = useState(true);
  const results = [
    {
      url:
        'https://image.shutterstock.com/image-photo/islamabad-pakistan-april-25-2019-260nw-1407461093.jpg',
    },
    {
      url:
        'https://i.pinimg.com/originals/ca/76/0b/ca760b70976b52578da88e06973af542.jpg',
    },
    {
      url:
        'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
    },
    {
      url:
        'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
    },
    {
      url:
        'https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg',
    },
    {
      url:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRFU7U2h0umyF0P6E_yhTX45sGgPEQAbGaJ4g&usqp=CAU',
    },
  ];
  const addToPlayList = () => {
    Snackbar.show({
      text: ' Saved to playlist',
      duration: Snackbar.LENGTH_LONG,
      action: {
        text: 'Change',
        textColor: 'tomato',
        onPress: () => {
          setsinglePaused(true);
          playListRef.current.open();
        },
      },
    });
  };
  useEffect(() => {
    console.log(width, ' ', height);
  }, []);
  const toggleFollowState = () => {
    switch (followState) {
      case 'follow':
        setFollowState('followed');
        break;
      case 'followed':
        setFollowState('follow');
        break;
    }
  };

  const handleShare = async () => {
    setSharing(true);
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
  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor={primaryColor}
        leftComponent={
          <AntDesign
            onPress={() => {
              setsinglePaused(true);
              navigation.goBack();
            }}
            name="arrowleft"
            style={{
              fontSize: 26,
              color: 'white',
            }}
          />
        }
      />
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        <View activeOpacity={0.9} style={[styles.cardStyle]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 5,
            }}>
            <Image source={dummy} style={styles.userImgStyle} />

            <View
              style={{
                marginTop: 7,
                width: '80%',
              }}>
              <Text
                style={[
                  // styles.mediumText,
                  {
                    color: primaryColor,
                    fontSize: 16,
                    fontFamily: Fonts.CenturyRegular,
                    alignSelf: 'flex-start',
                    width: '100%',
                  },
                ]}>
                Zaheer01{' '}
                <Text
                  style={[
                    // styles.mediumText,
                    {
                      fontSize: 12,
                      color: '#212121',
                      fontFamily: Fonts.CenturyRegular,
                      // opacity: 0.6,
                    },
                  ]}>
                  posted a Challenge at{' '}
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Fonts.CenturyRegular,
                      color: 'skyblue',
                    }}>
                    Giga Mall,DHA Phase 2{'   '}
                  </Text>
                </Text>{' '}
                <Text
                  style={[
                    // styles.mediumText,
                    {
                      color: primaryColor,
                      fontSize: 16,
                      fontFamily: Fonts.CenturyRegular,
                      marginBottom: 4,
                    },
                  ]}>
                  {`\n`}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                  }}>
                  {/* <Ionicons
                  name="md-location-sharp"
                  style={{fontSize: 11, color: 'skyblue', alignSelf: 'center'}}
                /> */}
                  {/* <Text
                  style={{
                    fontSize: 11,
                    fontFamily: Fonts.century,
                    color: 'skyblue',
                  }}>
                  Giga Mall,DHA Phase 2{'   '}
                </Text> */}
                  <Text
                    style={{
                      fontSize: 11,
                      fontFamily: Fonts.CenturyRegular,
                      color: 'gray',
                    }}>
                    3 Km away{'   '} 4 min ago
                  </Text>
                </View>
              </Text>

              {/* <Text
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
                >
                {item.name}
              </Text>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 16,
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
                      fontSize: 16,
                      fontFamily: Fonts.CenturyBold,
                    },
                  ]}>
                  {item.to === '' ? `\n` : `${item.to} \n`}
                </Text>
              }
              <Text
                style={[styles.mediumText, {fontSize: 10, color: '#696866'}]}>
                {item.time}
                {'  '}
                {item.km}
                {'   '}
              </Text>
            </Text> */}
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
              navigation.navigate('Hashtag');
              // setsinglePaused(!singlePaused)
            }}>
            #Kiki Challenge
          </Text>
          <View style={[styles.horizontalContainer]}></View>
          <View>
            <TouchableWithoutFeedback
              onPress={() => {
                setsinglePaused(!singlePaused);
              }}>
              <Video
                source={{
                  uri:
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
                }}
                paused={singlePaused}
                resizeMode="cover"
                muted={muted}
                style={{
                  height: height / 2,
                  width: '100%',
                  backgroundColor: 'black',
                  // borderRadius: 20,
                }}
              />
            </TouchableWithoutFeedback>

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
                <Entypo
                  name="eye"
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
                  100
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setMuted(!muted);
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
                  name={muted ? 'volume-mute' : 'volume-high'}
                  color="white"
                  size={20}
                />
              </TouchableOpacity>
            </View>

            {singlePaused && (
              <Entypo
                name="controller-play"
                color="white"
                style={[styles.playButton]}
                onPress={() => {
                  // setsinglePaused(!singlePaused)
                  setsinglePaused(!singlePaused);
                }}
              />
            )}
          </View>
          <Text
            style={[
              styles.mediumText,
              {
                fontSize: 14,
                alignSelf: 'flex-end',
                margin: 5,
                fontFamily: Fonts.CenturyRegular,
                color: primaryColor,
              },
            ]}
            onPress={() => {
              navigation.navigate('ViewRes');
            }}>
            See Full Thread
          </Text>
          <View
            style={[
              styles.horizontalContainer,
              {justifyContent: 'space-between', marginHorizontal: 4},
            ]}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => setLiked(!liked.liked)}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 4,
                    // alignSelf: 'center',
                    // backgroundColor: 'tomato',
                  }}>
                  {liked ? (
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
                        tintColor: liked ? primaryColor : 'black',
                        marginLeft: liked ? 0 : 15,
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

                          // marginLeft: liked ? 0 : 15,
                          // marginBottom: liked ? -5 : 0,
                        },
                      ]}>
                      200{' '}
                    </Text>
                    <Text
                      style={[
                        styles.smallText,

                        {
                          // marginTop: liked ? -5 : 0,
                          // marginLeft: liked ? 0 : 15,
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
                    200{' '}
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
                  setsinglePaused(!singlePaused);
                  navigation.navigate('Camera');
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
                  flexDirection: 'column',
                  // alignSelf: 'center',
                },
              ]}>
              <TouchableOpacity
                onPress={() => handleShare()}
                activeOpacity={0.5}>
                <FontAwesome
                  name="share"
                  style={{
                    fontSize: width / 18.70129,
                    color: sharing ? primaryColor : 'black',
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
                  200{' '}
                </Text>
                <Text style={[styles.smallText, {marginTop: -1}]}>shares</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flex: 1, marginTop: 5}}>
          <FlatList
            style={{width: width - 20, top: height / 11.67755}}
            showsVerticalScrollIndicator={false}
            data={results}
            keyExtractor={(result) => result.url}
            numColumns={3}
            contentContainerStyle={{flexGrow: 1}}
            style={{flex: 1}}
            renderItem={({item}) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Responses');
                  }}>
                  <Image
                    style={styles.thumbnailStyle}
                    source={{uri: item.url}}
                  />
                </TouchableWithoutFeedback>
              );
            }}
          />
        </View>

        <View style={{height: height / 5}}></View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
