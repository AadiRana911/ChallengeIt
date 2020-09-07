import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {Fonts} from '../utils/Fonts';

import OptionsMenu from 'react-native-options-menu';

import Video from 'react-native-video';
// import styles from './styles';
import {PLAYER_STATES} from 'react-native-media-controls';
import ViewPager from '@react-native-community/viewpager';
import Snackbar from 'react-native-snackbar';
import RNFetchBlob from 'rn-fetch-blob';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {primaryColor} from './colors';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LottieView from 'lottie-react-native';

// export const Container = styled.View`
//   background: #fff;
//   position: absolute;
//   width: 100%;
//   height: 100%;
//   z-index: -1;
// `;
const VideoPlayer = ({navigation, play, item}) => {
  return (
    // <TouchableOpacity activeOpacity={1}>
    <View
      style={{
        background: '#fff',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}>
      <Video
        source={{uri: item.vid}}
        // style={styles.mediaPlayer}
        volume={0.5}
        resizeMode="cover"
        repeat={true}
        paused={play}
        style={{
          width: '100%',
          height: '100%',
        }}
        // onReadyForDisplay={() => SetVideoLoad(false)}
      />
    </View>
    /* <Animated.View
          style={{
            position: 'absolute',
            height: height / 4,
            width: width / 8,
            bottom: height / 10,
            left: width - 60,
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            transform: [{translateX: translateBottomIconsX}],
          }}>
          <OptionsMenu
            customButton={
              <Entypo
                name="dots-three-horizontal"
                style={{fontSize: 30, color: 'white'}}
              />
            }
            options={['Add to playlist', 'Report Video']}
            actions={[addToPlayList, () => reportRef.current.open()]}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              toggleLike(item.id);
            }}>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              {item.liked ? (
                <LottieView
                  source={require('../../utils/clap.json')}
                  style={{
                    height: 37,
                    width: 37,

                    marginRight: -22,
                    overflow: 'hidden',
                  }}
                  autoPlay
                  loop
                />
              ) : (
                <Image
                  source={require('../../assets/images/clap.png')}
                  style={{
                    tintColor: item.liked ? primaryColor : 'white',
                    height: 27,
                    width: 27,
                    marginLeft: 5,
                  }}
                />
              )}

              <Text
                style={{
                  fontSize: 9,
                  marginRight: item.liked ? -25 : 0,
                  marginLeft: item.liked ? 0 : 4,
                  color: 'white',
                  fontFamily: Fonts.CenturyBold,
                  marginTop: !item.liked ? 4 : 0,
                }}>
                {item.claps}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => download()}>
              <MaterialCommunityIcons
                name="download"
                style={{fontSize: 30, color: 'white'}}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 9,
                marginLeft: 4,
                color: 'white',
                fontFamily: Fonts.CenturyBold,
              }}>
              {item.downloads}
            </Text>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Entypo
              name="forward"
              style={{fontSize: 30, color: 'white'}}
              onPress={() => {
                handleShare();
              }}
            />
            <Text
              style={{
                fontSize: 9,
                marginLeft: 4,
                color: 'white',
                fontFamily: Fonts.CenturyBold,
              }}>
              {item.shares}
            </Text>
          </View>
        </Animated.View>
       */
    // </TouchableOpacity>
  );
};

export default VideoPlayer;
