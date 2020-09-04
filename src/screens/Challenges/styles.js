import {StyleSheet, Dimensions} from 'react-native';

import {Fonts} from '../../utils/Fonts';

const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionImage: {
    width: '100%',
    height: height / 2.5,
    marginVertical: '2%',
    borderRadius: 10,
  },
  playButton: {
    opacity: 0.8,
    fontSize: 70,
    color: 'white',
    position: 'absolute',
    left: width / 2 - 35,
    top: height / 4 - 35,
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
  userImgStyle: {
    height: 50,
    width: 50,
    borderRadius: 70,
    alignSelf: 'center',
    margin: 5,
  },
  iconsStyle: {
    height: 18,
    width: 18,
  },
  bottomTabIcon: {
    height: 25,
    width: 25,
  },
  bottomContainer: {
    // marginLeft: '4%',
    padding: 5,
    marginTop: 5,
    flexDirection: 'row',
  },
  cardStyle: {
    flex: 1,
    margin: 10,
    // padding: 15,
    backgroundColor: 'white',
    // elevation: 10,
    // shadowColor: '#BDBDBD',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowRadius: 5,
    // shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 10,
  },
  iconStyle: {
    height: 35,
    width: 35,
    borderRadius: 17.5,
    backgroundColor: 'teal',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: 0.5,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  dividerStyle: {
    width: '95%',
    height: 1,
    marginVertical: 5,
    alignSelf: 'center',
  },
  smallButton: {
    padding: 15,
    width: '40%',
    backgroundColor: 'red',
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 10,
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
});
export default styles;
