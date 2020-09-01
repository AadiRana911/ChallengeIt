import {StyleSheet, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionImage: {
    width: '100%',
    height: SCREEN_HEIGHT / 2.5,
    marginVertical: '2%',
    borderRadius: 10,
  },
  mediumText: {
    // fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    alignSelf: 'center',
  },
  smallText: {
    // fontFamily: Fonts.RobotoRegular,
    fontSize: 10,
    alignSelf: 'center',
  },
  largeText: {
    // fontFamily: Fonts.RobotoMedium,
    fontSize: 16,
    width: '87%',
    // color: theme.colors.gray,
    marginLeft: 10,
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
    padding: 15,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 10,
  },
});
export default styles;
