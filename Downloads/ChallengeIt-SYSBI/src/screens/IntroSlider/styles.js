import {StyleSheet, Dimensions} from 'react-native';
import {primaryColor} from '../../components/colors';
const {width} = Dimensions.get('window');
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'center',
  },
  skipText: {
    padding: 10,
    height: 45,
    width: 150,
    color: primaryColor,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,

    elevation: 3,

    shadowColor: '#db4d3d',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  backArrow: {
    height: 25,
    width: 25,

    borderRadius: 50,
    marginLeft: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider1Style: {
    flex: 1,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    // marginBottom: 10,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headingStyle: {
    fontSize: 20,
    color: 'black',
  },
  detailStyle: {
    textAlign: 'center',
    fontSize: 20,
    top: 150,
    color: primaryColor,
    fontFamily: Fonts.CenturyRegular,
  },

  nextBtnStyle: {
    // position: 'absolute',
    // width: width/4.5,
    padding: 10,
    height: 40,
    borderRadius: 15,
    // alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    color: 'white',
    // elevation: 3,
    // marginRight: '40%',
    // marginRight: width / 2 - width / 7,
    backgroundColor: primaryColor,

    shadowColor: '#db4d3d',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  buttonTextStyle: {
    fontSize: 18,
    color: 'white',
  },
  activeDotStyle: {
    backgroundColor: 'tomato',
  },
  Input: {
    margin: 10,
    backgroundColor: '#E8F0FF',
    padding: 10,
    borderRadius: 30,
    width: '75%',
    fontFamily: 'geometriaBold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  buttonStyle: {
    margin: 10,
    padding: 15,
    borderRadius: 30,
    width: '75%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default styles;
