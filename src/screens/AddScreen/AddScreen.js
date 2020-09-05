import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
const height = Dimensions.get('window').height;
const AddScreen = ({navigation, route}) => {
  const [pasue, setPause] = useState(false);
  const {video} = route.params;

  return (
    <ScrollView
      style={{flex: 1}}
      contentContainerStyle={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => setPause(!pasue)} activeOpacity={1}>
        <Video
          paused={pasue}
          source={{uri: video}}
          style={styles.mediaPlayer}
          volume={1}
          resizeMode={'cover'}
          style={{
            aspectRatio: 1,
            width: '100%',
          }}
        />
      </TouchableOpacity>
      {pasue && (
        <TouchableWithoutFeedback onPress={() => setPause(!pasue)}>
          <Entypo
            name="controller-play"
            color="white"
            style={styles.playButton}
          />
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity style={styles.buttonStyle}>
        <Text style={[styles.largeText, {color: 'white'}]}>Upload</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default AddScreen;
