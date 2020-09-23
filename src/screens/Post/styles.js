import {StyleSheet, Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
