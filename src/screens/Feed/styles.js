import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Fonts} from '../../utils/Fonts';
export default StyleSheet.create({
  container: {
    flex: 1,
    // height,
    // width,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  dividerStyle: {
    width: '95%',
    height: 1,
    marginVertical: 5,
    alignSelf: 'center',
  },
  textareaContainer: {
    height: 140,
    padding: 5,
    // backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderRadius: 4,
    margin: 10,
    width: '95%',
    borderColor: '#bfbfbf',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
    fontFamily: Fonts.CenturyRegular,
  },
  smallButton: {
    padding: 15,
    width: '40%',
    backgroundColor: 'red',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    top: 0,
    left: 0,
  },
  horizontalContainer: {
    flexDirection: 'row',
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
    // position: 'absolute',
    width,
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    height: '100%',

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
    fontFamily: Fonts.CenturyBold,
  },
  mediumText: {
    fontSize: 12,
    fontFamily: Fonts.CenturyRegular,
    alignSelf: 'center',
  },
  smallText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 10,
    alignSelf: 'center',
  },
  largeText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 16,
    // fontWeight: 'bold',
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
