import {StyleSheet, Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#eee',
  },
  head: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height/12,
    marginTop: height/20,
  },
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    // marginTop: 10,
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
    fontSize: 17,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    padding: 5,
    width: '30%',
    backgroundColor: 'red',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%',
    marginVertical: 10,
  },
  thumbnailStyle: {
    height: 100,
    width: 105,
    margin: 5,

    borderRadius: 10,
  },
  userStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

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
});
export default styles;
