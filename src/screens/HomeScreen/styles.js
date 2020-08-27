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
      mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width

      },
});