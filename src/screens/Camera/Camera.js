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
import {RNCamera} from 'react-native-camera';
import {primaryColor} from '../../components/colors';
import CountDown from 'react-native-countdown-component';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';

const Height = Dimensions.get('window').height;

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
    };
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
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
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
              this.setState({recording: false}, () => {
                this.stopRecording.bind(this);
                this.props.navigation.navigate('Preview', {
                  video: this.state.uri,
                });
              });
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
          style={styles.preview}
          flashMode={
            this.state.cameraType === 'back' && this.state.isFlash
              ? RNCamera.Constants.FlashMode.on
              : RNCamera.Constants.FlashMode.off
          }
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
        />
        {this.state.cameraType === 'back' && (
          <Ionicons
            style={{
              position: 'absolute',
              bottom: Height / 5,
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

  async startRecording() {
    this.setState({recording: true});
    // default to mp4 for android as codec is not set
    const {uri, codec = 'mp4', size} = await this.camera.recordAsync();
    this.setState({recording: false, processing: true});
    const type = `video/${codec}`;

    this.setState({processing: false, uri: uri, type: type}, () => {
      this.props.navigation.navigate('Preview', {video: uri});
    });
  }

  stopRecording() {
    this.camera.stopRecording();
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
