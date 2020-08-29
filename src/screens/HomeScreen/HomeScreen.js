import React, {useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions, Animated, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from './styles'
import { PLAYER_STATES } from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';

import {primaryColor} from '../../components/colors'
import Entypo from 'react-native-vector-icons/Entypo';
import TabBar from '../../components/navigation';
import ProfileScreen from '../ProfileScreen'

const HomeScreen = ({navigation}) => {
    let player;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');
    const [isText1Active, setIsText1Active] = useState(true);
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    const [gestureName, setGestureName] = useState('none');
    const {width, height} = Dimensions.get('window');
    const xImg =  width - 80;
    const xStrip =  width - 56;
    const xScreen =  width + 40;
    const [translateXImg, setTranslateXImg] = useState(new Animated.Value(0));
    const [translateXStrip, setTranslateXStrip] = useState(new Animated.Value(0));
    const [translateXScreen, setTranslateXScreen] = useState(new Animated.Value(0));

    onSeek = seek => videoPlayer.seek(seek);
    onPaused = playerState => {
          setPaused(!paused);
          setPlayerState(playerState);
    };
    onReplay = () => {
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING );
        videoPlayer.seek(0);
    };
    onProgress = data => {
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
          setCurrentTime(data.currentTime);
        }
    };

    onLoad = data => {
        setDuration(data.duration);
        setIsLoading(false);
    }
    onLoadStart = () => setIsLoading(true);
    // onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
    onError = () => alert('Oh! ', error);
    enterFullScreen = () => {};
    
    renderToolbar = () => (
        <View>
          <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => setCurrentTime(currentTime);
    
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
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
      }

    const handleImageSlide = () => {
        Animated.spring(translateXImg, {
            toValue: -width+100,
            duration: 5000,
            useNativeDriver: true
        }).start();
    }
    const handleStripSlide = () => {
        Animated.spring(translateXStrip, {
            toValue: -(width+50050),
            duration: 5000,
            useNativeDriver: true,
        }).start();
    }
    const handleScreenSlide = () => {
        Animated.spring(translateXScreen, {
            toValue: -(width),
            duration: 5000,
            useNativeDriver: true
        }).start();
    }

    return (
        <View style = {[styles.container]}>
        
            <TouchableWithoutFeedback onPress = {() => setPaused(!paused)}>
                <Video
                    paused={paused}
                    source={require('../../assets/Videos/sample.mp4')}
                    style={styles.mediaPlayer}
                    volume={10}
                    resizeMode = 'cover'
                    repeat = {true}
                />
            </TouchableWithoutFeedback>
            <LinearGradient colors={['rgba(0,0,0,0.4)', 'rgba(0,0,0,0.1)', 'rgba(0,0,0,0.01)']} style = {[styles.switchTextView]}>
                <TouchableWithoutFeedback onPress = {() => {setIsText1Active(true)}}>
                    <Text style = {[styles.textStyle, {marginRight: 10, color: isText1Active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}]}>Trending</Text>
                </TouchableWithoutFeedback>
                <Text style = {[styles.textStyle, {color: 'white'}]}>|</Text>
                <TouchableWithoutFeedback onPress = {() => {setIsText1Active(false)}}>
                    <Text style = {[styles.textStyle, {marginLeft: 10, color: !isText1Active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}]}>All Challenges</Text>
                </TouchableWithoutFeedback>
            </LinearGradient>
            <ProfileScreen 
                    translateScreen = {translateXScreen}
                    translateXImg = {translateXImg}
                    paused={paused}
                    source={require('../../assets/Videos/sample.mp4')}
                    style={styles.mediaPlayer}
                    volume={10}
                    resizeMode = 'cover'
                    repeat = {true}
            /> 

                <GestureRecognizer 
                    style = {{
                        // backgroundColor: 'red',
                        position: 'absolute',
                        top: Dimensions.get('window').height/3+30,
                        left: Dimensions.get('window').width-80,
                        // width: 40
                    }} 
                    config = {config}
                    onSwipeLeft={() => {handleImageSlide(),handleStripSlide(),handleScreenSlide(),console.log(width, height)}}>
                    <Animated.View 
                    style = {{
                        top: 1,
                        left:30,
                        position: 'absolute',
                        width: 50000,
                        height: 58,
                        backgroundColor: primaryColor,
                        transform: [{translateX: translateXStrip}]
                    }} />
                    <Animated.Image 
                        source = {require('../../assets/images/samplechallenger.jpg')} 
                        style = {{
                            borderRadius: 30,
                            borderWidth: 2,
                            // position: 'absolute',
                            height: 60,
                            width: 60,
                            transform: [{translateX: translateXImg}],
                            borderColor: 'white',
                            // top: Dimensions.get('window').height/6,
                            // left: Dimensions.get('window').width-80,
                        }} 
                        resizeMode = 'cover'
                        />                   
                </GestureRecognizer>
                {/* <GestureRecognizer onSwipeLeft={() => handleSlide(xImg),() => console.log(translateX)}>
                        <View style = {{top: Dimensions.get('window').height/6+1,left: Dimensions.get('window').width-56,width: 110, height: 58, backgroundColor: primaryColor}}></View>
                        <Image source = {require('../../assets/images/samplechallenger.jpg')} style = {styles.imageStyle} resizeMode = 'cover'/>
                        <ProfileScreen />                    
                </GestureRecognizer> */}

                
                {paused && <Entypo name = 'controller-play' color = 'white' style = {styles.playButton}/>}

                
                
                <TabBar navigation = {navigation}/>
                
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
    )
}



export default HomeScreen;