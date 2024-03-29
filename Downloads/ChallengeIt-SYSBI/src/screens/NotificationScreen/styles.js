import {StyleSheet} from 'react-native';
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 2,
    backgroundColor: 'white',
  },
  mediumText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 14,
    alignSelf: 'center',
    width: '80%',
  },
  smallText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 10,
    alignSelf: 'center',
  },
  largeText: {
    fontSize: 16,
    fontFamily: Fonts.CenturyBold,
  },
  notifContainer: {
    padding: 15,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
  },
});
export default styles;
