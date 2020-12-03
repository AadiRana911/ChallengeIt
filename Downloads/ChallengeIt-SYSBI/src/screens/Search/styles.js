import {StyleSheet} from 'react-native';
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  item: {
    marginLeft: 50,
    marginVertical: 20,
    flexDirection: 'row',
  },
  dividerStyle: {
    width: '100%',
    height: 1,
  },
  mediumText: {
    fontFamily: Fonts.CenturyRegular,
    fontSize: 12,
    alignSelf: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    backgroundColor: 'tomato',
    justifyContent: 'space-between',
  },
});
export default styles;
