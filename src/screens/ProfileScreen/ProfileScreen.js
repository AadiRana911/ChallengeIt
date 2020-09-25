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

  const [paused, setPaused] = useState(true);
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
          setPaused(true);
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

  const handleShare = async (id) => {
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
    <SafeAreaView style={{flex: 1}}>
      <Header
        backgroundColor={primaryColor}
        leftComponent={
          <AntDesign
            onPress={() => {
              setPaused(true);
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
        <View activeOpacity={0.9} style={[styles.cardStyle, {elevation: 0}]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            <Image source={dummy} style={styles.userImgStyle} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 4,
              }}>
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
                      marginTop: 3,
                      color: primaryColor,
                      fontSize: 16,
                      fontFamily: Fonts.CenturyBold,
                    },
                  ]}>
                  Zaheer01
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
                  Posted a{' '}
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
                    Challenge {`\n`}
                  </Text>
                }

                <Text
                  style={[styles.mediumText, {fontSize: 12, color: '#696866'}]}>
                  Posted: 3 hours ago{`\n`}
                </Text>
                <Text
                  style={[styles.mediumText, {fontSize: 12, color: '#696866'}]}
                  onPress={() => {
                    navigation.navigate('ViewRes');
                    setPaused(!paused);
                  }}>
                  2 km away {'  '} See Full Thread
                </Text>
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
              }}>
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
              setPaused(!paused);
            }}>
            #Kiki Challenge
          </Text>
          <View style={[styles.horizontalContainer]}></View>
          <View>
            <DoubleTap
              singleTap={() => {
                setPaused(!paused);
              }}
              // doubleTap={() => {
              //   toggleLike(item.id);
              // }}
              delay={200}>
              <Video
                source={{
                  uri:
                    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
                }}
                paused={paused}
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
                200
              </Text>
            </View>
            {paused && (
              <Entypo
                name="controller-play"
                color="white"
                style={[styles.playButton]}
                onPress={() => {
                  setPaused(!paused);
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
              <TouchableWithoutFeedback onPress={() => setLiked(!liked)}>
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
                      // progress={clapProgress}
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

                          // marginLeft: item.liked ? 0 : 15,
                          // marginBottom: item.liked ? -5 : 0,
                        },
                      ]}>
                      200{' '}
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
                    100{' '}
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
                  setPaused(!paused);
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
                    {200}{' '}
                  </Text>
                  <Text style={[styles.smallText, {marginTop: -1}]}>
                    shares
                  </Text>
                </View>
              </TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
