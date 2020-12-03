// import React, {Component} from 'react';
// import {ImageBackground, Text, View, TouchableOpacity} from 'react-native';
// import {first, second, third} from '../../assets';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import styles from './styles';
// import AsyncStorage from '@react-native-community/async-storage';
// import ViewPager from '@react-native-community/viewpager';

// export default class IntroSlider extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       slides: [
//         {
//           key: '1',
//           image: first,
//           // heading: 'Best learning resources',
//           details: 'Record your challenge and throw it to the people',
//           // buttonText: 'Next',
//         },
//         {
//           key: '2',
//           image: second,
//           // heading: 'Best learning resources',
//           details: 'Accept challenges and show your talent to the world',
//           // buttonText: 'Next',
//         },
//         {
//           key: '3',
//           image: third,
//           // heading: 'Best learning resources',
//           details: 'Enjoy the following',
//           // buttonText: 'Get Started',
//         },
//       ],

//       showRealApp: false,
//     };
//   }

//   renderItem = ({item}) => {
//     return (
//       <ImageBackground source={item.image} style={styles.slider1Style}>
//         {/* <Text style={styles.headingStyle}>{item.heading}</Text> */}
//         <Text style={styles.detailStyle}>{item.details}</Text>
//       </ImageBackground>
//     );
//   };

//   onDone = async () => {
//     try {
//       await AsyncStorage.setItem('Slider', 'true');
//       const {navigate} = this.props.navigation;
//       navigate('Signin');
//     } catch (err) {}
//   };
//   renderDoneButton = () => {
//     return (
//       <TouchableOpacity style={styles.nextBtnStyle} onPress={this.onDone}>
//         <Text style={styles.buttonTextStyle}>Done</Text>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     if (this.state.showRealApp) {
//       return <App />;
//     } else {
//       return (
//         <AppIntroSlider
//           activeDotStyle={styles.activeDotStyle}
//           renderItem={(item) => this.renderItem(item)}
//           data={this.state.slides}
//           renderDoneButton={this.renderDoneButton}
//           showNextButton={false}
//           // activeDotStyle={{backgroundColor: 'red', width: '15%', bottom: 30}}
//           // dotStyle={{width: '15%', backgroundColor: 'lightgrey', bottom: 30}}
//         />
//       );
//   }
// }
