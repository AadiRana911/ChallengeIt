import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    // flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    top: 0,
    left: 0,
  },
  box: {
    backgroundColor: 'tomato',
    marginLeft: -12,
    marginTop: -12,
    width: width / 4,
    height: height / 5,
    borderRadius: 2,
    borderColor: '#000',
  },
  mediaPlayer: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    // height: '100%',

    backgroundColor: 'black',
  },
  imageStyle: {
    height: 60,
    width: 60,
    // alignSelf: 'center',
    borderRadius: 30,
    borderWidth: 2,
    position: 'absolute',
    borderColor: 'white',
    top: Dimensions.get('window').height / 6,
    left: Dimensions.get('window').width - 80,
  },
  AnimatedViewStyle: {
    backgroundColor: 'red',
    // alignSelf: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height / 6,
    left: Dimensions.get('window').width - 80,
  },
  textStyle: {
    fontSize: 18,
  },
  switchTextView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height / 8,
    width: '100%',
    top: 0,
    position: 'absolute',
  },
});
