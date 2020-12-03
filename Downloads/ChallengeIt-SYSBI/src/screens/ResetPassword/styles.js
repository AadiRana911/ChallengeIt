import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
import {Fonts} from '../../utils/Fonts';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: width / 15,
    paddingVertical: height / 20,
    justifyContent: 'space-around',
  },
  textInputStyle: {
    marginBottom: 15,

    fontFamily: Fonts.CenturyRegular,

    padding: 15,

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
  nextButtonStyle: {
    backgroundColor: '#fff',
    paddingVertical: 7,
    alignItems: 'center',
    width: '65%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
    borderRadius: 7,
    borderWidth: 0.5,
    borderColor: '#eee',
  },
});
export default styles;
