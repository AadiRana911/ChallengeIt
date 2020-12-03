import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {RNCamera} from 'react-native-camera';
import {primaryColor} from '../../components/colors';
import CountDown from 'react-native-countdown-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
const Height = Dimensions.get('window').height;
import TrackPlayer from 'react-native-track-player';
TrackPlayer.setupPlayer();
import {Fonts} from '../../utils/Fonts';
import Entypo from 'react-native-vector-icons/Entypo';
class Camera extends Component {
  constructor() {
    super();

    this.state = {
      recording: false,
      processing: false,
      video: [],
      cameraType: 'back',
      isFlash: false,
      uri: '',
      audio: '',
      audioName: '',
    };
  }
  componentDidMount() {
    const challengeId =
      this.props.route.params && this.props.route.params.challengeId;
    console.log(this.props);
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [TrackPlayer.CAPABILITY_PLAY, TrackPlayer.CAPABILITY_PAUSE],
    });
  }

  pickAudio = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.audio],
      });
      for (const res of results) {
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        this.setState({audio: res.uri, audioName: res.name}, () => {});
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  //audio player
  start = () => {
    // Add a track to the queue
    TrackPlayer.add({
      id: 'trackId',
      url: this.state.audio,
      title: 'Track Title',
      artist: 'Track Artist',
    });
    TrackPlayer.play();

    // Start playing it
  };

  render() {
    console.log(Height);
    const {recording, processing} = this.state;

    let button = (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.startRecording.bind(this)}
        style={[styles.capture]}>
        <Text
          style={{
            fontSize: 12,
            color: 'gray',
            fontWeight: 'bold',
            color: primaryColor,
          }}>
          RECORD
        </Text>
      </TouchableOpacity>
    );

    if (recording) {
      button = (
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.stopRecording.bind(this)}
          style={[styles.capture, {backgroundColor: 'red'}]}>
          <CountDown
            until={30}
            size={20}
            onFinish={() => {
              this.state.audio !== '' && TrackPlayer.reset();
              this.stopRecording.bind(this);

              // this.setState({recording: false}, () => {
              //   this.stopRecording.bind(this);
              //   // TrackPlayer.reset();
              //   // this.props.navigation.navigate('Preview', {
              //   //   video: this.state.uri,
              //   // });
              // });
            }}
            digitStyle={{backgroundColor: 'transparent'}}
            digitTxtStyle={{color: 'white'}}
            timeToShow={['S']}
            timeLabels={{m: null, s: null}}
          />
        </TouchableOpacity>
      );
    }

    if (processing) {
      button = (
        <View style={styles.capture}>
          <ActivityIndicator animating size={18} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          useNativeZoom
          playSoundOnCapture={false}
          style={styles.preview}
          flashMode={RNCamera.Constants.FlashMode.on}
          // flashMode={
          //   this.state.cameraType === 'back' && this.state.isFlash
          //     ? RNCamera.Constants.FlashMode.on
          //     : RNCamera.Constants.FlashMode.off
          // }
          type={
            this.state.cameraType === 'back'
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          captureAudio={true}
        />
        {this.state.audioName !== '' && (
          <Text
            style={{
              fontFamily: Fonts.CenturyRegular,
              position: 'absolute',
              top: Height / 13,
              color: 'white',
              alignSelf: 'center',
              textAlign: 'center',
              // opacity: 0.5,
            }}>
            Sound Name:{`\n` + this.state.audioName.substr('0', '50')}
          </Text>
        )}

        {this.state.cameraType === 'back' && (
          <Ionicons
            style={{
              position: 'absolute',
              bottom: Height / 3.5,

              right: 15,
              // flexDirection: 'row',
              // width: '100%',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}
            onPress={() => {
              this.setState({isFlash: !this.state.isFlash});
            }}
            name={this.state.isFlash ? 'flash' : 'flash-off'}
            size={30}
            color="white"
          />
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: 15,
            bottom: Height / 5,
          }}
          activeOpacity={0.7}
          onPress={() => {
            this.pickVideo();
          }}>
          <Entypo
            name="folder-video"
            size={27}
            color="white"
            // style={{marginRight: '10%'}}
          />
        </TouchableOpacity>
        <View
          style={{
            position: 'absolute',
            bottom: Height / 30,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '35%',
              alignItems: 'center',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.pickAudio();
              }}>
              <FontAwesome
                name="music"
                size={27}
                color="white"
                style={{marginRight: '10%'}}
              />
            </TouchableOpacity>

            {/* <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({
                  cameraType:
                    this.state.cameraType === 'back' ? 'front' : 'back',
                });
              }}>
              <Ionicons
                name="color-filter"
                size={34}
                color="white"
                style={{marginLeft: '10%'}}
              />
            </TouchableOpacity> */}
          </View>

          <View style={{width: '30%'}}>{button}</View>

          <View
            style={{
              width: '35%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.setState({
                  cameraType:
                    this.state.cameraType === 'back' ? 'front' : 'back',
                });
              }}>
              <Ionicons
                name="ios-camera-reverse-sharp"
                size={30}
                color="white"
                style={{marginLeft: '7%'}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  pickVideo = () => {
    const challengeId =
      this.props.route.params && this.props.route.params.challengeId;
    ImagePicker.openPicker({mediaType: 'video'}).then((video) => {
      this.props.navigation.navigate('Preview', {
        video: video.path,
        challengeId: challengeId,
      });
    });
  };
  async startRecording() {
    this.setState({recording: true}, async () => {
      // await this.sound.play();
      this.videoRec();
      this.state.audio !== '' && this.start();
    });
  }

  async videoRec() {
    const challengeId =
      this.props.route.params && this.props.route.params.challengeId;
    const options = {
      videoBitrate: 5 * 1000 * 1000,
      // quality: 1,
    };
    const {uri, codec = 'mp4', size} = await this.camera.recordAsync(options);
    this.setState({recording: false, processing: true});
    const type = `video/${codec}`;
    this.setState({processing: false, uri: uri, type: type}, () => {
      // this.sound.pause();
      this.props.navigation.navigate('Preview', {
        video: uri,
        challengeId: challengeId,
      });
    });
  }

  async stopRecording() {
    this.state.audio !== '' && TrackPlayer.reset();
    this.camera.stopRecording();

    // this.sound.pause();
  }
}

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'black',
    // height: '100%',
  },
  input: {
    margin: 10,
    backgroundColor: '#e8f0ff',
    paddingLeft: 10,
    borderRadius: 10,
    width: '75%',
    fontFamily: 'geometriaBold',
    alignSelf: 'center',
    textAlign: 'center',
    // justifyContent:'center',
    // alignItems:'center'
  },
  buttonStyle: {
    margin: 10,
    backgroundColor: primaryColor,
    padding: 15,
    borderRadius: 30,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  preview: {
    height: '100%',
  },
  capture: {
    backgroundColor: 'white',

    borderRadius: 40,
    borderWidth: 3,
    borderColor: 'white',

    height: 80,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  pencilContainer: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20,
  },
});
