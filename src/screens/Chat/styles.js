import {StyleSheet} from 'react-native';
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  mainContianer: {
    flex: 1,
    borderColor: '#D3D3D3',
  },
  firstButton: {
    flex: 1,
  },
  mediumText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 14,
    alignSelf: 'center',
    width: '80%',
  },
  smallText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 10,
    alignSelf: 'center',
  },
  largeText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 16,
  },
  notifContainer: {
    padding: 10,
    margin: 0.5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // borderRadius: 4,
    // margin: 15,
    // padding: 15,
    backgroundColor: 'white',
    // elevation: 5,
    shadowColor: '#BDBDBD',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    // borderWidth: 1,
    // borderColor: theme.colors.lightGray,
    borderRadius: 1,
  },
});
export default styles;
