import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from './styles';
import {PLAYER_STATES} from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';
import ViewPager from '@react-native-community/viewpager';

import {primaryColor} from '../../components/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import TabBar from '../../components/navigation';
import ProfileScreen from '../ProfileScreen';
import {useFocusEffect} from '@react-navigation/native';

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
  const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  const [gestureName, setGestureName] = useState('none');
  const [vids] = useState([
    {
      id: 0,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 1,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 2,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
      id: 3,
      vid: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
  ]);
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

  onSeek = (seek) => videoPlayer.seek(seek);
  onPaused = (playerState) => {
    setPaused(!paused);
    setPlayerState(playerState);
  };
  onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.seek(0);
  };
  onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };
  onLoadStart = () => setIsLoading(true);
  // onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
  onError = () => alert('Oh! ', error);
  enterFullScreen = () => {};

  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = (currentTime) => setCurrentTime(currentTime);

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
      <TouchableWithoutFeedback
        onPress={() => setPaused(!paused)}
        style={styles.container}>
        <ViewPager
          onPageSelected={(e) => {
            setActive(e.nativeEvent.position);
            setPaused(true);
          }}
          orientation="vertical"
          style={{height: '100%'}}
          initialPage={0}>
          {vids.map((item, index) => {
            return (
              <ViewPager
                onPageSelected={(e) => {
                  setActive(e.nativeEvent.position);
                  setPaused(true);
                }}
                orientation="horizontal"
                style={{height: '100%'}}
                initialPage={0}>
                {vids.map((item, index) => {
                  return (
                    <Video
                      key={index}
                      paused={true}
                      source={{uri: item.vid}}
                      style={styles.mediaPlayer}
                      volume={10}
                      resizeMode="cover"
                      repeat={true}
                    />
                  );
                })}
              </ViewPager>
            );
          })}
        </ViewPager>
      </TouchableWithoutFeedback>

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
        source={require('../../assets/Videos/sample.mp4')}
        style={styles.mediaPlayer}
        volume={10}
        resizeMode="cover"
        repeat={true}
      />

      <GestureRecognizer
        style={{
          // backgroundColor: 'red',
          position: 'absolute',
          top: height / 3 + height / 27,
          left: width - width / 5.2,
          // width: 40
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
            // position: 'absolute',
            height: width / 6.857,
            width: width / 6.857,
            transform: [{translateX: translateXCurrentImg}],
            borderColor: 'white',
            // top: Dimensions.get('window').height/6,
            // left: Dimensions.get('window').width-80,
          }}
          resizeMode="cover"
        />
      </GestureRecognizer>
      <TabBar
        navigation={navigation}
        params={'Home'}
        animateReverse={animateReverse}
      />

      {/* <MediaControls
                 duration={duration}
                isLoading={isLoading}
                mainColor="#333"
                onFullScreen={onFullScreen}
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
