import React, {useState} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions} from 'react-native';
import Video from 'react-native-video';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import styles from './styles'
import { PLAYER_STATES } from 'react-native-media-controls';
import LinearGradient from 'react-native-linear-gradient';

import {primaryColor} from '../../components/colors'
import Entypo from 'react-native-vector-icons/Entypo';
import TabBar from '../../components/navigation'

const HomeScreen = ({navigation}) => {
    let player;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');
    const [isText1Active, setIsText1Active] = useState(true);
    const {SWIPE_LEFT} = swipeDirections;

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

    return (
        <View style = {[styles.container]}>
            <TouchableWithoutFeedback onPress = {() => setPaused(!paused)}>
            <View style = {{flex: 1}}>
                <Video
                    // onEnd={onEnd}
                    onLoad={onLoad}
                    onLoadStart={onLoadStart}
                    onProgress={onProgress}
                    paused={paused}
                    ref={videoPlayer => player = videoPlayer}
                    resizeMode={screenType}
                    onFullScreen={true}
                    source={require('../../assets/Videos/sample.mp4')}
                    style={styles.mediaPlayer}
                    volume={10}
                    resizeMode = 'cover'
                    repeat = {true}
                />
                <View style = {{position: 'absolute',top: Dimensions.get('window').height/6+1,left: Dimensions.get('window').width-56,width: 110, height: 58, backgroundColor: primaryColor}}></View>
                <Image source = {require('../../assets/images/samplechallenger.jpg')} style = {styles.imageStyle} resizeMode = 'cover'/>
                {paused && <Entypo name = 'controller-play' color = 'white' style = {styles.playButton}/>}

                <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.011)']} style = {[styles.switchTextView]}>
                    <TouchableWithoutFeedback onPress = {() => {setIsText1Active(true)}}>
                        <Text style = {[styles.textStyle, {marginRight: 10, color: isText1Active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}]}>Trending</Text>
                    </TouchableWithoutFeedback>
                    <Text style = {[styles.textStyle, {color: 'white'}]}>|</Text>
                    <TouchableWithoutFeedback onPress = {() => {setIsText1Active(false)}}>
                        <Text style = {[styles.textStyle, {marginLeft: 10, color: !isText1Active ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}]}>All Challenges</Text>
                    </TouchableWithoutFeedback>
                </LinearGradient>
                
                <TabBar navigation = {navigation}/>
            </View>
                
            </TouchableWithoutFeedback>

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