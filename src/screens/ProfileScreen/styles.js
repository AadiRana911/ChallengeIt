import {StyleSheet, Dimensions} from 'react-native'

export default styles = StyleSheet.create({
mediaPlayer: {
    position: 'absolute',
    width: Dimensions.get('window').width-20,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70, 
    color: 'white', 
    position: 'absolute', 
    left: Dimensions.get('window').width/2-35, 
    top: Dimensions.get('window').height/6-35
  },
});