import React, {Component} from 'react';
import {View, Text, Animated} from 'react-native';
import styles from '../screens/Feed/styles';
import OptionsMenu from 'react-native-options-menu';

const [translateBottomIconsX] = useState(new Animated.Value(0));

export default class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  addToPlayList = () => {
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
  render() {
    return (
      <View style={{flex: 1}}>
        <Video
          paused={false}
          source={{uri: item.vid}}
          style={styles.mediaPlayer}
          volume={0.5}
          resizeMode="cover"
          repeat={true}
        />
        <Animated.View
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
      </View>
    );
  }
}
