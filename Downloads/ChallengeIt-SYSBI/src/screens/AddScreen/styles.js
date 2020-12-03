import {StyleSheet, Dimensions} from 'react-native';
import {primaryColor} from '../../components/colors';
const styles = StyleSheet.create({
  playButton: {
    opacity: 0.7,
    fontSize: 70,
    color: 'white',
    position: 'absolute',
    top: Dimensions.get('window').height / 4 - 35,
    left: Dimensions.get('window').width / 2 - 35,
  },
  buttonStyle: {
    padding: 15,
    width: '70%',
    backgroundColor: primaryColor,
    borderRadius: 100,
    alignSelf: 'center',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default styles;
