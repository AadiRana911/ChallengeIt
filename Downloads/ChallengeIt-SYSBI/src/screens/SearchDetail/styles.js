import {StyleSheet} from 'react-native';
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 1,
    paddingVertical: 14,
  },
  mediumText: {
    fontFamily: Fonts.CenturyBold,
    fontSize: 15,
    alignSelf: 'center',
    color: '#212121',
  },
  item: {
    margin: 10,
    flexDirection: 'row',
  },
  dividerStyle: {
    width: '50%',
    height: 1,
    alignSelf: 'center',
  },
});
export default styles;
