import {Fonts} from '../../utils/Fonts';

import {StyleSheet, Dimensions} from 'react-native';
import {primaryColor} from '../../components/colors';
const {height} = Dimensions.get('window');

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
  },
  imageStyle: {
    height: 80,
    width: 80,
    borderRadius: 50,

    // borderWidth: 3,
    // borderColor: '#fff',
  },
  head: {
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height / 15,
    // marginTop: height/20,
  },
  categoryContainer: {
    flex: 0.5,
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    // marginTop: 10,
  },
  mediumText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 12,
    alignSelf: 'center',
  },
  smallText: {
    fontFamily: Fonts.CenturyRegular,

    fontSize: 10,
    alignSelf: 'center',
  },
  largeText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 17,
  },
  horizontalContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    padding: 5,
    width: '30%',
    backgroundColor: primaryColor,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    // borderRadius: 70,
    // borderWidth: 3,
    // borderColor: primaryColor,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

    width: '100%',
    marginVertical: 10,
  },
  thumbnailStyle: {
    height: 120,
    width: 100,
    marginHorizontal: 1,
    // borderRadius: 10,
    marginVertical: 1,
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
