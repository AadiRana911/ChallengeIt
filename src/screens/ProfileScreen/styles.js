import {StyleSheet, Dimensions} from 'react-native';
import {primaryColor} from '../../components/colors';
import {Fonts} from '../../utils/Fonts';
const {width, height} = Dimensions.get('window');
export default styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    backgroundColor: 'white',
    left: width,
    paddingTop: 20,
    paddingHorizontal: 3,
    flex: 1,
  },
  smallText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 10,
    alignSelf: 'center',
  },
  videoContainer: {
    marginTop: height / 18,
    backgroundColor: 'red',
    // width: width - 20,
    height: height / 2.5,
    // alignSelf: 'center',
  },
  bottomContainer: {
    // marginLeft: '4%',
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
  },
  videoTouchableContainer: {
    backgroundColor: 'red',
    width: width,
    height: height / 3,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    alignSelf: 'center',
    width: '100%',
  },
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    position: 'absolute',
    left: width / 2 - 35,
    top: height / 5 - 35,
  },
  imageStyle: {
    position: 'absolute',
    borderRadius: 30,
    borderWidth: width / 205.714,
    height: width / 8,
    width: width / 8,
    top: height / 100,
    left: width - width / 5.2,
    // top: 100,
    // left: 100,
    borderColor: 'white',
  },
  screenIconContainer: {
    top: 25,
    flexDirection: 'row',
    marginHorizontal: width / 20,
    justifyContent: 'space-between',
  },
  userNameContainer: {
    flexDirection: 'row',
    left: width / 14,
    marginTop: height / 75,
    top: height / 100,
    justifyContent: 'space-evenly',
  },
  cardStyle: {
    flex: 1,
    marginVertical: 1,
    marginHorizontal: 3,
    padding: 3,
    backgroundColor: 'white',
    elevation: 10,
    // shadowColor: '#BDBDBD',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowRadius: 5,
    // shadowOpacity: 1.0,
    // borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 3,
  },
  userImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignSelf: 'center',
    margin: 5,
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
  horizontalContainer: {
    flexDirection: 'row',
  },
  verticalContainer: {
    margin: 10,
  },
  followButtonStyle: {
    backgroundColor: primaryColor,
    paddingHorizontal: width / 27.8,
    paddingVertical: 3,
    borderRadius: 50,
    marginRight: width / 4.57142,
  },
  userStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: height / 15,

    backgroundColor: '#fff',

    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
  // individualStatContainer: {
  //   alignItems: 'center',
  //   width: '50%',
  //   paddingVertical: 10,
  // },
  thumbnailStyle: {
    height: width / 2.7,
    width: width / 3,
    marginRight: 1,
    marginBottom: 1,
  },
});
