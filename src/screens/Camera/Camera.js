import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {primaryColor} from '../../components/colors';
const Height = Dimensions.get('window').height;
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PERMISSIONS, requestMultiple} from 'react-native-permissions';

class Camera extends Component {
  constructor() {
    super();

    this.state = {
      recording: false,
      processing: false,
      video: [],
      cameraType: 'back',
    };
  }

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
          style={[styles.capture, {borderColor: primaryColor}]}>
          <Text
            style={{
              fontSize: 12,
              color: 'gray',
              fontWeight: 'bold',
              color: primaryColor,
            }}>
            STOP
          </Text>
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
          cameraProps={{captureAudio: false}}
          type={
            this.state.cameraType === 'back'
              ? RNCamera.Constants.Type.back
              : RNCamera.Constants.Type.front
          }
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={
            'We need your permission to use your camera phone'
          }
        />

        <View
          style={{
            position: 'absolute',
            bottom: Height / 30,
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{width: '35%'}}></View>

          <View style={{width: '30%'}}>{button}</View>

          <View style={{width: '35%', flexDirection: 'row'}}>
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
                style={{marginLeft: '10%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pencilContainer}>
              <Ionicons name="pencil-sharp" size={18} color={primaryColor} />
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
      this.props.navigation.navigate('Challenge', {video: uri});
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
