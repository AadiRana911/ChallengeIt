import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image, Animated, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';

import Entypo from 'react-native-vector-icons/Entypo';
import styles from './styles';
import primaryColor from '../../components/colors'
const ProfileScreen = ({translateScreen, translateXImg}) => {
    const {width, height} = Dimensions.get('window');
    const [paused, setPaused] = useState(false);
    useEffect(() => {
        console.log('txi',translateXImg)
    },[]);
    return (
        <Animated.View style = {{height: height,width: width, position: 'absolute',backgroundColor: 'black', left: width,transform: [{translateX: translateScreen}], paddingTop: 10, paddingHorizontal: 10}}>
            <View style = {{backgroundColor: 'red', width: width-20, height: height/3}}>
            <TouchableWithoutFeedback style = {{backgroundColor: 'red', width: width-20, height: height/3}} onPress = {() => setPaused(!paused)}>
                <Video
                    paused={paused}
                    source={require('../../assets/Videos/sample.mp4')}
                    style={styles.mediaPlayer}
                    volume={10}
                    resizeMode = 'cover'
                    repeat = {true}
                />
            </TouchableWithoutFeedback>
            {paused && <Entypo name = 'controller-play' color = 'white' style = {styles.playButton}/>}
            </View>
            <TouchableOpacity style = {{flexDirection: 'row', left: 80, top: 25}} onPress = {() => alert('Followed')}>
                <View style={{color: 'white'}}><Text style = {{color: 'white', fontSize: 20}}>+</Text></View>
                <View style={{color: 'white', marginLeft: 5}}><Text style = {{color: 'white', fontSize: 20}}>Follow</Text></View>
            </TouchableOpacity>


        </Animated.View>
    );
}

export default ProfileScreen;