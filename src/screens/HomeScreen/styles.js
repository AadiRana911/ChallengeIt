import {StyleSheet, Dimensions} from 'react-native'
export default StyleSheet.create({
    container: {
        flex: 1,
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
        position: 'absolute', 
        left: Dimensions.get('window').width/2-35, 
        top: Dimensions.get('window').height/2-35
      },
      mediaPlayer: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
        top: Dimensions.get('window').height/6,
        left: Dimensions.get('window').width-80,
      },
      AnimatedViewStyle: {
        backgroundColor: 'red',
        // alignSelf: 'center',
        position: 'absolute',
        top: Dimensions.get('window').height/6,
        left: Dimensions.get('window').width-80,
      },
      textStyle: {
        fontSize: 18,
      },
      switchTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimensions.get('window').height/8,
      }
});