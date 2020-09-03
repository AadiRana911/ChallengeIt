import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
} from 'react-native';
import Video from 'react-native-video';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from './styles';
import {MediaControls, PLAYER_STATES} from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';
import ViewPager from '@react-native-community/viewpager';

import {primaryColor} from '../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TabBar from '../../components/navigation';
import ProfileScreen from '../ProfileScreen';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const Feed = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = setPaused(false);

      return () => unsubscribe;
    }, []),
  );
  let player;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [nextPaused, setNextPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');
  const [isText1Active, setIsText1Active] = useState(true);
  const [isCurrentScreenEnabled, setIsCurrentScreenEnabled] = useState(true);
  const [gestureName, setGestureName] = useState('none');
  let direction = undefined;
  let vids = [
    {
      id: 0,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      paused: false,
    },
    {
      id: 1,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      paused: true,
    },
    {
      id: 2,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      paused: true,
    },
    {
      id: 3,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
      paused: true,
    },
  ];

  const videos = [
    {
      id: 4,
      vid: require('../../assets/Videos/sample.mp4'),
      paused: true,
    },
    {
      id: 5,
      vid: require('../../assets/Videos/sample.mp4'),
      paused: true,
    },
    {
      id: 6,
      vid: require('../../assets/Videos/sample.mp4'),
      paused: true,
    },
    {
      id: 7,
      vid: require('../../assets/Videos/sample.mp4'),
      paused: true,
    },
  ];

  const [active, setActive] = useState(0);

  const {width, height} = Dimensions.get('window');
  const xImg = width - 80;
  const xStrip = width - 56;
  const xScreen = width + 40;
  const [translateXImg, setTranslateXImg] = useState(new Animated.Value(0));
  const [translateXCurrentImg, setTranslateXCurrentImg] = useState(
    new Animated.Value(0),
  );
  const [translateYImg, setTranslateYImg] = useState(new Animated.Value(0));
  const [translateXStrip, setTranslateXStrip] = useState(new Animated.Value(0));
  const [translateXScreen, setTranslateXScreen] = useState(
    new Animated.Value(0),
  );
  const [translateXCurrentScreen, setTranslateXCurrentScreen] = useState(
    new Animated.Value(0),
  );

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setGestureName(gestureName);
    switch (gestureName) {
      //   case SWIPE_UP:
      //     this.setState({backgroundColor: 'red'});
      //     break;
      //   case SWIPE_DOWN:
      //     this.setState({backgroundColor: 'green'});
      //     break;
      case SWIPE_LEFT:
        navigation.navigate('Profile');
        break;
        //   case SWIPE_RIGHT:
        //     this.setState({backgroundColor: 'yellow'});
        break;
    }
  };
  const handleImageSlideX = () => {
    Animated.spring(translateXImg, {
      toValue: -width + width / 4.4,
      duration: 5000,
      useNativeDriver: true,
      tension: 10,
    }).start();
  };
  const handleImageSlideY = () => {
    Animated.spring(translateYImg, {
      toValue: height / 6.2,
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
      toValue: -(width * 2 - width / 5.2 + width / 13.71428),
      duration: 5,
      useNativeDriver: true,
      tension: 1,
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
    setIsCurrentScreenEnabled(false);
    setPaused(true);
    setNextPaused(false);
  };

  return (
    <View style={{flex: 1}}>
      <GestureRecognizer
        styles={{flex: 1, backgroundColor: 'red'}}
        config={config}
        onSwipeLeft={() => {
          (direction = 'left'), console.log(direction);
        }}
        onSwipeRight={() => {
          (direction = 'right'), console.log(direction);
        }}
        onSwipeUp={() => {
          (direction = 'up'), console.log(direction);
        }}
        onSwipeDown={() => {
          (direction = 'down'), console.log(direction);
        }}>
        <ViewPager
          onPageSelected={(e) => {
            setActive(e.nativeEvent.position);
            setPaused(true);
          }}
          orientation="vertical"
          style={{height: '100%'}}
          initialPage={0}>
          {videos.map((item1, index1) => (
            <ViewPager
              onPageSelected={(e) => {
                setActive(e.nativeEvent.position);
                setPaused(false);
              }}
              orientation="horizontal"
              style={{height: '100%'}}
              initialPage={0}>
              {vids.map((item, index) => (
                /* console.log(direction === 'left' || 'right' ? item1 : item , `Direction is: ${direction}`) */

                <TouchableWithoutFeedback
                  onPress={() => (item.paused = !item.paused)}
                  key={item.id}>
                  <Video
                    key={index}
                    paused={
                      direction === 'left' || 'right'
                        ? item.paused
                        : item1.paused
                    }
                    source={
                      direction === 'left' || 'right'
                        ? {uri: item.vid}
                        : item1.vid
                    }
                    style={styles.mediaPlayer}
                    volume={10}
                    resizeMode="cover"
                    repeat={true}
                  />
                </TouchableWithoutFeedback>
              ))}
            </ViewPager>
          ))}
        </ViewPager>
      </GestureRecognizer>

      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.01)']}
        style={[styles.switchTextView]}>
        <TouchableWithoutFeedback
          onPress={() => {
            setIsText1Active(true);
          }}>
          <Text
            style={[
              styles.textStyle,
              {
                marginRight: 10,
                color: isText1Active
                  ? 'rgba(255,255,255,1)'
                  : 'rgba(255,255,255,0.5)',
              },
            ]}>
            Trending
          </Text>
        </TouchableWithoutFeedback>
        <Text style={[styles.textStyle, {color: 'white'}]}>|</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            setPaused(true);
            navigation.navigate('Challenges');
            setIsText1Active(false);
          }}>
          <Text
            style={[
              styles.textStyle,
              {
                marginLeft: 10,
                color: !isText1Active
                  ? 'rgba(255,255,255,1)'
                  : 'rgba(255,255,255,0.5)',
              },
            ]}>
            All Challenges
          </Text>
        </TouchableWithoutFeedback>
      </LinearGradient>
      {paused && (
        <TouchableOpacity
          activeOpacity={1}
          style={[
            {position: 'absolute', left: width / 2 - 35, top: height / 2 - 35},
          ]}
          onPress={() => setPaused(!paused)}>
          <Entypo
            name="controller-play"
            color="white"
            style={[styles.playButton]}
          />
        </TouchableOpacity>
      )}
      <ProfileScreen
        translateScreen={translateXScreen}
        translateXImg={translateXImg}
        translateYImg={translateYImg}
        paused={nextPaused}
        setPaused={setNextPaused}
        style={styles.mediaPlayer}
        volume={10}
        resizeMode="cover"
        repeat={true}
      />

      <GestureRecognizer
        style={{
          position: 'absolute',
          top: height / 3 + height / 27,
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
            height: width / 7.09359,
            backgroundColor: primaryColor,
            transform: [{translateX: translateXStrip}],
          }}
        />
        <Animated.Image
          source={require('../../assets/images/samplechallenger.jpg')}
          style={{
            borderRadius: 30,
            borderWidth: width / 205.714,
            height: width / 6.857,
            width: width / 6.857,
            transform: [{translateX: translateXCurrentImg}],
            borderColor: 'white',
          }}
          resizeMode="cover"
        />
      </GestureRecognizer>
      <View
        style={{
          position: 'absolute',
          height: height / 4,
          width: width / 8,
          top: height / 1.55,
          left: width - 60,
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <Entypo
          name="dots-three-horizontal"
          style={{fontSize: 30, color: 'white'}}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            source={require('../../assets/images/clap.png')}
            style={{tintColor: primaryColor, height: 30, width: 30}}
          />
          <Text style={{fontSize: 9, marginLeft: 4, color: 'white'}}>3000</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <MaterialCommunityIcons
            name="download"
            style={{fontSize: 30, color: 'white'}}
          />
          <Text style={{fontSize: 9, marginLeft: 4, color: 'white'}}>3000</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Entypo name="forward" style={{fontSize: 30, color: 'white'}} />
          <Text style={{fontSize: 9, marginLeft: 4, color: 'white'}}>3000</Text>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: height / 6,
          left: width / 20,
          width: '80%',
          alignItems: 'center',
          flexDirection: 'row',
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
        <View>
          <Text style={{color: 'white', fontSize: width / 22}}>Zaheer01</Text>
          <Text
            style={{
              color: 'white',
              fontSize: width / 30,
            }}>
            This is my tribute to challenge
          </Text>
        </View>
      </View>
      <TabBar
        navigation={navigation}
        params={'Home'}
        animateReverse={animateReverse}
      />

      {/* <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
      />  */}
    </View>
  );
};

export default Feed;
