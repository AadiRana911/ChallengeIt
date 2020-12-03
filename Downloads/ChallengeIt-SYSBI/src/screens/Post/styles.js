import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  largeText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 17,
  },
  mediumText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 12,
    alignSelf: 'center',
  },
  // playButton: {
  //   opacity: 0.8,
  //   fontSize: 70,
  //   color: 'white',
  //   position: 'absolute',
  //   left: width / 2 - 35,
  //   top: height / 1.5 - 35,
  // },
});
export default styles;
