import React, {useState} from 'react';
import {View, Text} from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import styles from './styles'
const HomeScreen = () => {
    let player;
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [screenType, setScreenType] = useState('content');

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
    onEnd = () => setPlayerState(PLAYER_STATES.ENDED);
    onError = () => alert('Oh! ', error);
    enterFullScreen = () => {};
    
    renderToolbar = () => (
        <View>
          <Text> toolbar </Text>
        </View>
    );
    onSeeking = currentTime => setCurrentTime(currentTime);
      

    return (
        <View style = {[styles.container]}>
        
            <Video
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                ref={videoPlayer => player = videoPlayer}
                resizeMode={screenType}
                onFullScreen={true}
                source={require('../../assets/sample.mp4')}
                style={styles.mediaPlayer}
                volume={10}
                resizeMode = 'cover'
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
    )
}



export default HomeScreen;