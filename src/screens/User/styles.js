import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#eee',
  },
  head: {
    flex: 0.5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 7,
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
    fontSize: 15,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    padding: 8,
    width: '30%',
    backgroundColor: 'red',
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 5,
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
    height: 90,
    width: 85,
    margin: 5,

    borderRadius: 10,
  },
});
export default styles;
